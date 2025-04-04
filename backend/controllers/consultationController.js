const Consultation = require('../models/consultationModel');

// Controller to create a new consultation
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

// Controller to retrieve all consultations
exports.getConsultations = async (req, res) => {
  try {
    const consultations = await Consultation.find();
    res.status(200).json(consultations);
  } catch (error) {
    console.error('Error fetching consultations:', error);
    res.status(500).json({ message: 'Failed to fetch consultations', error });
  }
};

// Controller to retrieve a consultation by ID
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

// Controller to update a consultation by ID
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

// Controller to update the consultation date
exports.updateConsultationDate = async (req, res) => {
  try {
    const { id } = req.params;
    const { date } = req.body;

    if (!date) {
      return res.status(400).json({ message: 'New date is required' });
    }

    const updatedConsultation = await Consultation.findByIdAndUpdate(
      id,
      { consultationDate: date },
      { new: true, runValidators: true }
    );

    if (!updatedConsultation) {
      return res.status(404).json({ message: 'Consultation not found' });
    }

    res.status(200).json({ message: 'Consultation date updated successfully', updatedConsultation });
  } catch (error) {
    console.error('Error updating consultation date:', error);
    res.status(500).json({ message: 'Failed to update consultation date', error });
  }
};

// Controller to delete a consultation by ID
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

// Controller to update additional notes for a consultation
exports.updateAdditionalNotes = async (req, res) => {
  try {
    const { id } = req.params;
    const { notes } = req.body;

    if (!notes) {
      return res.status(400).json({ message: 'Additional notes are required' });
    }

    const updatedConsultation = await Consultation.findByIdAndUpdate(
      id,
      { notes },
      { new: true, runValidators: true }
    );

    if (!updatedConsultation) {
      return res.status(404).json({ message: 'Consultation not found' });
    }

    res.status(200).json({ message: 'Additional notes updated successfully', updatedConsultation });
  } catch (error) {
    console.error('Error updating additional notes:', error);
    res.status(500).json({ message: 'Failed to update additional notes', error });
  }
};