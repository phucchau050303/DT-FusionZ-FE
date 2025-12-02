
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Box, Typography, Link as MuiLink, IconButton, TextField, Button } from '@mui/material';
import { Facebook, Instagram, Twitter, YouTube, Room, Email, Phone } from '@mui/icons-material';
import logo from '../../../public/dtfusionz.png'; // Update path to your logo

const currentYear = new Date().getFullYear();

const Footer = () => (
	<Box sx={{ backgroundColor: '#222', color: '#fff', pt: 4, pb: 2, mt: 5 }} component="footer">
		<Container>
			<Row className="align-items-center justify-content-between">
				<Col md={3} className="text-center mb-3 mb-md-0">
					<img src={logo} alt="DT FusionZ Logo" style={{ width: 80, marginBottom: 8 }} />
					<Typography variant="h6" fontWeight="bold">DT FusionZ</Typography>
				</Col>
				<Col md={3} className="mb-3 mb-md-0">
					<Typography variant="subtitle1" fontWeight="bold">Contact</Typography>
					<Box display="flex" alignItems="center" mb={1}><Room sx={{ mr: 1 }} />18A Essex St, Footscray, VIC</Box>
					<Box display="flex" alignItems="center" mb={1}><Phone sx={{ mr: 1 }} />0406 265 708</Box>
					<Box display="flex" alignItems="center" mb={1}><Email sx={{ mr: 1 }} />info@dtfusionz.com</Box>
					<MuiLink href="https://maps.google.com/?q=123+Main+St" target="_blank" rel="noopener" color="inherit">View on Map</MuiLink>
				</Col>
				<Col md={3} className="mb-3 mb-md-0">
					<Typography variant="subtitle1" fontWeight="bold">Hours</Typography>
					<Typography variant="body2">Mon-Sat <br/>Morning: 11:00 AM - 3:00 PM <br></br>Evening:  5:00 PM - 9:00 PM</Typography>
					<Box mt={2}>
						<Typography variant="subtitle1" fontWeight="bold">Follow Us</Typography>
						<IconButton href="https://facebook.com" target="_blank" color="inherit"><Facebook /></IconButton>
						<IconButton href="https://instagram.com" target="_blank" color="inherit"><Instagram /></IconButton>
						<IconButton href="https://twitter.com" target="_blank" color="inherit"><Twitter /></IconButton>
						<IconButton href="https://youtube.com" target="_blank" color="inherit"><YouTube /></IconButton>
					</Box>
				</Col>
			</Row>
			<Row className="mt-4">
				<Col md={6} className="mb-2 mb-md-0">
					<Typography variant="body2">&copy; {currentYear} DT FusionZ. All rights reserved.</Typography>
				</Col>
				<Col md={6} className="text-md-end">
					<MuiLink href="/privacy" color="inherit" sx={{ mr: 2 }}>Privacy Policy</MuiLink>
					<MuiLink href="/terms" color="inherit">Terms of Service</MuiLink>
				</Col>
			</Row>
		</Container>
	</Box>
);

export default Footer;



