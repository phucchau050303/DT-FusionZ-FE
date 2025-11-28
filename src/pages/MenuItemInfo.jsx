import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Collapse from "react-bootstrap/Collapse";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import api from "../services/api";
import "../styles/MenuItemInfo.css"; // new file for option styles

// fallback item & fallback groups (keeps UI working if backend lacks groups)
const fallbackItem = {
  id: 0,
  name: "Tonkatsu Chicken",
  description: "Lorem Ipsum ...",
  price: 20,
  image: "/VeganBento.png",
};

const fallbackGroups = [
  {
    id: "sauces",
    title: "Sauces",
    // default option objects include id, name, priceModifier
    options: [
      { id: "tonkatsu", name: "Tonkatsu Sauce", priceModifier: 0 },
      { id: "miso", name: "Miso Sauce", priceModifier: 0.5 },
      { id: "spicy", name: "Spicy Mayo", priceModifier: 0.5 },
      { id: "soy", name: "Soy Sauce", priceModifier: 0 },
    ],
    multi: true,
  },
  {
    id: "spice",
    title: "Spice Level",
    options: [
      { id: "mild", name: "Mild", priceModifier: 0 },
      { id: "medium", name: "Medium", priceModifier: 0 },
      { id: "hot", name: "Hot", priceModifier: 0 },
    ],
    multi: false,
  },
  {
    id: "extras",
    title: "Extras",
    options: [
      { id: "extrarice", name: "Extra Rice", priceModifier: 1.5 },
      { id: "extranoodles", name: "Extra Noodles", priceModifier: 1.5 },
      { id: "extraegg", name: "Extra Egg", priceModifier: 1 },
    ],
    multi: true,
  },
];

const MenuItemInfo = () => {
  const { id } = useParams(); // expects route like /item-info/:id
  const [item, setItem] = useState(null);
  const [optionGroups, setOptionGroups] = useState([]);
  const [openGroups, setOpenGroups] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({}); // { groupId: [optionId] }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getImageUrl = (url) => {
    if (!url) return "/VeganBento.png";
    if (url.startsWith("http")) return url;
    if (url.startsWith("/")) return url;
    const base = import.meta.env.VITE_API_URL || "";
    return `${base}/${url}`.replace(/([^:]\/)\/+/g, "$1");
  };

  useEffect(() => {
    let mounted = true;

    const fetchItemAndOptions = async () => {
      setLoading(true);
      setError(null);

      try {
        const itemRes = await api.get(`/api/menu/items/${id}`);
        if (!mounted) return;
        const fetchedItem = itemRes.data;
        setItem(fetchedItem ?? fallbackItem);

        // The correct endpoint is the one defined in the C# controller:
        // "/api/options/item-option-groups/{itemId}"
        try {
          const optRes = await api.get(`/api/options/item-option-groups/${id}`);
          if (!mounted) return;

          // The backend returns an array of ItemOptionGroupResponseDto,
          // which represents a list of groups for the item.
          const groupsRaw = optRes.data || [];

          // The groupsRaw is an array of objects that each represent an Item-OptionGroup relationship.
          // We map this to the frontend's expected optionGroups structure.
          const groups = groupsRaw.map((g) => ({
            // Use OptionGroupId from the DTO, which is the unique ID for the group
            id: g.optionGroupId.toString(),
            // Use OptionGroupName as the title
            title: g.optionGroupName ?? `Group ${g.optionGroupId}`,

            // Correctly determine if it's a multi-select group.
            // If MaxSelection > 1, it's multi-select (checkboxes).
            // If MaxSelection === 1, it's single-select (radio buttons).
            multi: g.maxSelection > 1,

            // Map OptionValues to the options array
            options: (g.optionValues || []).map((opt) => ({
              id: opt.id.toString(), // Ensure ID is a string for consistent keys
              name: opt.name,
              priceModifier: Number(opt.priceModifier ?? 0),
            })),

            // Preserve other metadata for future use (like isRequired)
            isRequired: g.isRequired,
            minSelection: g.minSelection,
            maxSelection: g.maxSelection,
          }));

          setOptionGroups(groups.length ? groups : fallbackGroups);
        } catch (optErr) {
          console.warn("Option groups fetch failed; using fallback.", optErr);
          setOptionGroups(fallbackGroups);
        }
      } catch (err) {
        console.error("Failed to load item data:", err);
        if (!mounted) return;
        setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchItemAndOptions();
    return () => {
      mounted = false;
    };
  }, [id]);

  const toggleGroup = (groupId) =>
    setOpenGroups((prev) => ({ ...prev, [groupId]: !prev[groupId] }));

  const toggleOption = (groupId, optionId, multi) => {
    setSelectedOptions((prev) => {
      const current = prev[groupId] ?? [];
      if (multi) {
        // Multi-select: toggle option ID in the array
        return {
          ...prev,
          [groupId]: current.includes(optionId)
            ? current.filter((o) => o !== optionId)
            : [...current, optionId],
        };
      } else {
        // Single-select: select new option or deselect if already selected
        return {
          ...prev,
          [groupId]: current.includes(optionId) ? [] : [optionId],
        };
      }
    });
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger my-4">
        Failed to load item: {error.message || "Unknown error"}
      </div>
    );
  }

  const renderGroups = () =>
    optionGroups.map((group) => {
      const selected = selectedOptions[group.id] ?? [];
      const open = !!openGroups[group.id];

      // ensure options have a consistent shape with id/name/priceModifier
      const optionsNormalized = (group.options || []).map((opt) =>
        typeof opt === "string" ? { id: opt, name: opt, priceModifier: 0 } : opt
      );

      // Determine the selection rule label
      let ruleLabel = "";
      if (group.isRequired && group.multi) {
        ruleLabel = `Required (Max ${group.maxSelection})`;
      } else if (group.isRequired && !group.multi) {
        ruleLabel = "Required (Choose 1)";
      } else if (group.multi) {
        ruleLabel = `Optional (Choose up to ${group.maxSelection})`;
      } else {
        ruleLabel = "Optional (Choose 1)";
      }

      return (
        <div key={group.id} className="mb-3">
          <Row
            className="extra-box p-3 align-items-center"
            style={{ cursor: "pointer", border: "1px solid #eee", borderRadius: 4 }}
            onClick={() => toggleGroup(group.id)}
            aria-controls={`${group.id}-collapse`}
            aria-expanded={open}
          >
            <Col>
              <strong>{group.title}</strong>
              <br />
              <small className="text-info">{ruleLabel}</small>
            </Col>
            <Col className="text-end">
              <small className="text-muted me-3">
                {selected.length ? `${selected.length} selected` : ""}
              </small>
              <Button
                variant="link"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleGroup(group.id);
                }}
              >
                {open}
              </Button>
            </Col>
          </Row>

          <Collapse in={open}>
            <div id={`${group.id}-collapse`} className="mt-3">
              <Row className="g-2">
                {optionsNormalized.map((opt) => {
                  const optKey = opt.id ?? opt.name;
                  const checked = selected.includes(optKey);
                  const price = Number(opt.priceModifier ?? 0);
                  const priceLabel = price > 0 ? `+ $${price.toFixed(2)}` : "$0";

                  // Check if MaxSelection limit is reached AND this option isn't already checked
                  const maxSelectionReached = group.multi && selected.length >= group.maxSelection && !checked;

                  return (
                    <Col key={optKey} xs={12} md={6}>
                      <div
                        className={`option-card p-3 border rounded d-flex justify-content-between align-items-center ${
                          checked ? "selected" : ""
                        } ${maxSelectionReached ? "disabled-option" : ""}`}
                        style={{ cursor: maxSelectionReached ? "not-allowed" : "pointer" }}
                        onClick={() => !maxSelectionReached && toggleOption(group.id, optKey, group.multi)}
                      >
                        <span className="option-name">{opt.name}</span>
                        <span className="option-price text-muted">{priceLabel}</span>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </div>
          </Collapse>
        </div>
      );
    });

  // final item for rendering: prefer fetched item, fallback otherwise
  const currentItem = item ?? fallbackItem;

  return (
    <div className="container mt-5 menu-item-info">
      <Row>
        <Col xl={6}>
          <div className="d-flex align-items-center justify-content-center">
            <img
              src={getImageUrl(currentItem.imageUrl ?? currentItem.image)}
              alt={currentItem.name}
              className="img-item-info img-fluid rounded"
              onError={(e) => {
                e.currentTarget.src = "/VeganBento.png";
              }}
            />
          </div>
        </Col>

        <Col xl={6} className="d-flex flex-column align-items-center">
          <div className="mt-4 price-box p-5 text-center">
            <h2 className="text-uppercase">{currentItem.name}</h2>
            <span className="price-text">${Number(currentItem.price).toFixed(2)}</span>
            <h4 style={{ color: "#6C6C6C" }} className="text-uppercase">
              Call 0396893300 to order
            </h4>
          </div>
        </Col>
      </Row>

      <div className="mt-5">
        <h1>DESCRIPTION</h1>
        <p className="description-text">{currentItem.description}</p>
      </div>

      <div className="mt-5">
        <h1>EXTRA</h1>
        {renderGroups()}
      </div>
    </div>
  );
};

export default MenuItemInfo;
