const Consultation = require('../models/consultationModel');

// Create a new consultation
exports.createConsultation = async (req, res) => {
  try {
    const consultation = new Consultation(req.body);
    await consultation.save();
    res.status(201).json({ message: 'Consultation created successfully', consultation });
  } catch (error) {
    console.error('Error creating consultation:', error);
    res.status(500).json({ message: 'Failed to create consultation', error });
  }
};

// Get all consultations (optional, for admin or debugging purposes)
exports.getConsultations = async (req, res) => {
  try {
    const consultations = await Consultation.find();
    res.status(200).json(consultations);
  } catch (error) {
    console.error('Error fetching consultations:', error);
    res.status(500).json({ message: 'Failed to fetch consultations', error });
  }
};

// Get a single consultation by ID (optional)
exports.getConsultationById = async (req, res) => {
  try {
    const consultation = await Consultation.findById(req.params.id);
    if (!consultation) {
      return res.status(404).json({ message: 'Consultation not found' });
    }
    res.status(200).json(consultation);
  } catch (error) {
    console.error('Error fetching consultation:', error);
    res.status(500).json({ message: 'Failed to fetch consultation', error });
  }
};

// Update a consultation by ID (optional)
exports.updateConsultation = async (req, res) => {
  try {
    const consultation = await Consultation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!consultation) {
      return res.status(404).json({ message: 'Consultation not found' });
    }
    res.status(200).json({ message: 'Consultation updated successfully', consultation });
  } catch (error) {
    console.error('Error updating consultation:', error);
    res.status(500).json({ message: 'Failed to update consultation', error });
  }
};

// Delete a consultation by ID (optional)
exports.deleteConsultation = async (req, res) => {
  try {
    const consultation = await Consultation.findByIdAndDelete(req.params.id);
    if (!consultation) {
      return res.status(404).json({ message: 'Consultation not found' });
    }
    res.status(200).json({ message: 'Consultation deleted successfully' });
  } catch (error) {
    console.error('Error deleting consultation:', error);
    res.status(500).json({ message: 'Failed to delete consultation', error });
  }
};