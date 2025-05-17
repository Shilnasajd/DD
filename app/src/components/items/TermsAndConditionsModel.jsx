import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Checkbox,
  FormControlLabel,
  Backdrop,
  CircularProgress
} from '@mui/material';

const TermsAndConditionsModel = ({ open, onClose, email, onAccept }) => {
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle Accept and Continue Button
  const handleAccept = async () => {
    if (!accepted) {
      alert("You must accept the terms and conditions to continue.");
      return;
    }

    setLoading(true); // Show spinner

    try {
      const response = await fetch('https://ddcameras.com/backend/api/save_terms/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to save terms');
      }

      console.log('Terms accepted and API called successfully');
      onAccept(); // Call the onAccept callback from parent
    } catch (error) {
      console.error('Error saving terms:', error);
      alert('Something went wrong while saving terms. Please try again.');
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  // Handle Close button
  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Terms and Conditions</DialogTitle>
        <DialogContent dividers>
          <p>
            Welcome to DDCAMERAS. These Terms and Conditions ("Terms") govern your access to and use
            of our camera rental services through our website [www.yoursite.com] ("Site"). By
            accessing or using the Site and our services, you agree to be bound by these Terms.
          </p>

          <h4>1. Eligibility</h4>
          <p>
            You must be at least 18 years old and capable of entering into legally binding contracts
            to use our services. By registering or placing an order, you confirm that you meet these
            criteria.
          </p>

          <h4>2. Account Registration</h4>
          <p>
            To rent equipment, you must create an account. You are responsible for maintaining the
            confidentiality of your account information and for all activities that occur under your
            account.
          </p>

          <h4>3. Rental Agreement</h4>
          <p>When you place an order, you agree to:</p>
          <ul>
            <li>Pay the full rental fee, deposit (if applicable), and any applicable taxes.</li>
            <li>Return the equipment on or before the agreed return date & Time.</li>
            <li>Use the equipment responsibly and only for its intended purpose.</li>
          </ul>

          <h4>4. Rental Period</h4>
          <p>
            The rental period begins on the delivery or pickup date and ends on the return date. Late
            returns will incur additional fees calculated on a daily basis.
          </p>

          <h4>5. Delivery and Returns</h4>
          <p>
            We offer delivery and pickup options depending on your location based on a fare. You are
            responsible for returning the equipment in the same condition you received it.
          </p>

          <h4>6. Damage, Loss, or Theft</h4>
          <p>
            You are responsible for any damage, loss, or theft of the equipment during the rental
            period. Repair or replacement costs will be charged to you in case of damage or loss.
            Optional damage waivers may be available at checkout.
          </p>

          <h4>7. Cancellations and Refunds</h4>
          <p>
            Cancellations made at least [e.g., 48 hours] before the rental start date may be eligible
            for a full refund. No refunds for early returns or late cancellations.
          </p>

          <h4>8. Payment</h4>
          <p>
            All payments must be made through our secure online system. We accept [credit cards,
            PayPal, etc.].
          </p>

          <h4>9. Limitation of Liability</h4>
          <p>
            We are not liable for any indirect, incidental, or consequential damages arising from the
            use of our equipment. Our liability is limited to the total amount paid by you for the
            rental.
          </p>

          <h4>10. Intellectual Property</h4>
          <p>
            All content on our Site, including text, images, and logos, is our property or used with
            permission. You may not reproduce or use any content without prior written consent.
          </p>

          <h4>11. Governing Law</h4>
          <p>
            These Terms are governed by the laws of [Your Country/State]. Any disputes will be
            resolved in the courts of [Your Jurisdiction].
          </p>

          <h4>12. Changes to Terms</h4>
          <p>
            We may update these Terms at any time. Continued use of our services after changes
            constitutes acceptance of the new Terms.
          </p>

          <h4>13. Contact Us</h4>
          <p>If you have any questions, please contact us at:</p>
          <p>Email: dronedude@ddcameras.com</p>
          <p>Phone: +91 9562129456, +91 9544239456</p>
          <p>Address: DDCAMERAS, INDIA \ UAE</p>

          <FormControlLabel
            control={
              <Checkbox
                checked={accepted}
                onChange={() => setAccepted(!accepted)}
                name="termsAccepted"
              />
            }
            label="I accept the Terms and Conditions"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handleAccept} color="primary" disabled={!accepted}>
            Accept and Continue
          </Button>
        </DialogActions>
      </Dialog>

      {/* Spinner Backdrop */}
      <Backdrop open={loading} style={{ zIndex: 1301, color: '#fff' }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default TermsAndConditionsModel;
