import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Collapse from "react-bootstrap/Collapse";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { ChevronDown, ChevronUp } from "react-bootstrap-icons"; // Added for toggle icons
import api from "../services/api";
import "../styles/MenuItemInfo.css";

// fallback item & fallback groups (keeps UI working if backend lacks groups)
const fallbackItem = {
  id: 0,
  name: "Empty Item",
  description: "Loading...",
  price: 0,
  image: "/dtfusionz.png",
};

const fallbackGroups = [];

// --- Component Start ---
const MenuItemInfo = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [optionGroups, setOptionGroups] = useState([]);
  const [openGroups, setOpenGroups] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({}); // { groupId: [optionId] }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getImageUrl = (url) => {
    if (!url) return "/dtfusionz.png";
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

        try {
          const optRes = await api.get(`/api/options/item-option-groups/${id}`);
          if (!mounted) return;

          const groupsRaw = optRes.data || [];

          const groups = groupsRaw.map((g) => ({
            id: g.optionGroupId.toString(),
            title: g.optionGroupName ?? `Group ${g.optionGroupId}`,
            multi: g.maxSelection > 1,
            // Map OptionValues to the options array
            options: (g.optionValues || []).map((opt) => ({
              id: opt.id.toString(), // Ensure ID is a string for consistent keys
              name: opt.name,
              priceModifier: Number(opt.priceModifier ?? 0),
            })),
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

      // Check if MaxSelection limit is reached (for multi-select)
      const group = optionGroups.find(g => g.id === groupId);
      const maxSelection = group ? group.maxSelection : Infinity;
      const isAddingNew = !current.includes(optionId);
      const maxReached = multi && current.length >= maxSelection && isAddingNew;

      if (maxReached) {
        // Prevent selection if limit is reached
        return prev;
      }

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

  // --- NEW: Calculate Total Price ---
  const totalPrice = useMemo(() => {
    const basePrice = item ? Number(item.price) : 0;
    let optionPrice = 0;

    // Iterate through all selected options
    for (const groupId in selectedOptions) {
      const selectedIds = selectedOptions[groupId];
      const group = optionGroups.find(g => g.id === groupId);
      
      if (!group || selectedIds.length === 0) continue;

      selectedIds.forEach(optionId => {
        const option = group.options.find(opt => opt.id === optionId);
        if (option && option.priceModifier) {
          optionPrice += Number(option.priceModifier);
        }
      });
    }

    return (basePrice + optionPrice);
  }, [item, selectedOptions, optionGroups]);
  // ------------------------------------

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

  // final item for rendering: prefer fetched item, fallback otherwise
  const currentItem = item ?? fallbackItem;

  // --- NEW: Description rendering function ---
  const renderDescription = () => {
    if (!currentItem.description) return null;
    // Split the string by the line break pattern (\r\n) and map to lines
    const textLines = currentItem.description.split(/\r\n|\n/g); 

    return (
      <p className="description-text">
        {textLines.map((line, index) => (
          <React.Fragment key={index}>
            {line} 
            {/* If it's not the last line, insert a <br /> element */}
            {index < textLines.length - 1 && <br />}
          </React.Fragment>
        ))}
      </p>
    );
  };
  // -------------------------------------------

  const renderGroups = () =>
    optionGroups.map((group) => {
      const selected = selectedOptions[group.id] ?? [];
      const open = !!openGroups[group.id];

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
      
      const isMaxReached = group.multi && selected.length >= group.maxSelection;
      const isRequiredUnselected = group.isRequired && selected.length === 0 && !open;

      return (
        <div key={group.id} className="mb-3">
          <Row
            className={`extra-box p-3 align-items-center ${isRequiredUnselected ? 'border-danger' : ''}`}
            style={{ cursor: "pointer", border: "1px solid #eee", borderRadius: 4 }}
            onClick={() => toggleGroup(group.id)}
            aria-controls={`${group.id}-collapse`}
            aria-expanded={open}
          >
            <Col>
              <strong>{group.title}</strong>
              <br />
              <small className={`text-info ${isRequiredUnselected ? 'text-danger' : ''}`}>{ruleLabel}</small>
            </Col>
            <Col className="text-end">
              <small className="text-muted me-3">
                {selected.length ? `${selected.length} selected` : ""}
              </small>
              <Button
                variant="link"
                // Use Chevron Icon instead of rendering boolean 'open'
                onClick={(e) => {
                  e.stopPropagation();
                  toggleGroup(group.id);
                }}
              >
                {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </Button>
            </Col>
          </Row>

          <Collapse in={open}>
            <div id={`${group.id}-collapse`} className="mt-3">
              <Row className="g-2">
                {optionsNormalized.map((opt) => {
                  // Use opt.id (string) for consistency
                  const optKey = opt.id; 
                  const checked = selected.includes(optKey);
                  const price = Number(opt.priceModifier ?? 0);
                  const priceLabel = price > 0 ? `+ $${price.toFixed(2)}` : "";

                  // Check if MaxSelection limit is reached AND this option isn't already checked
                  const maxSelectionReached = isMaxReached && !checked;

                  return (
                    <Col key={optKey} xs={12} md={6}>
                      <div
                        className={`option-card p-3 border rounded d-flex justify-content-between align-items-center ${
                          checked ? "selected" : ""
                        } ${maxSelectionReached ? "disabled-option" : ""}`}
                        style={{ cursor: maxSelectionReached ? "not-allowed" : "pointer" }}
                        // Pass the group.multi flag correctly
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
                e.currentTarget.src = "/dtfusionz.png";
              }}
            />
          </div>
        </Col>

        <Col xl={6} className="d-flex flex-column align-items-center">
          <div className="mt-4 price-box p-5 text-center">
            <h2 className="text-uppercase">{currentItem.name}</h2>
            {/* Display the calculated Total Price */}
            <span className="price-text">${totalPrice.toFixed(2)}</span> 
            <h4 style={{ color: "#6C6C6C" }} className="text-uppercase">
              Call 0396893300 to order
            </h4>
          </div>
        </Col>
      </Row>

      <div className="mt-5">
        <h1>DESCRIPTION</h1>
        {/* Render the description using the new function */}
        {renderDescription()}
      </div>

      <div className="mt-5">
        <h1>EXTRA</h1>
        {renderGroups()}
      </div>
    </div>
  );
};

export default MenuItemInfo;