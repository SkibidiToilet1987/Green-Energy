const Installation = require('../models/installationModel');

// Controller to create a new installation request
exports.createInstallation = async (req, res) => {
  try {
    const installation = new Installation(req.body);
    await installation.save();
    res.status(201).json({ message: 'Installation request created successfully', installation });
  } catch (error) {
    console.error('Error creating installation:', error);
    res.status(500).json({ message: 'Failed to create installation request', error });
  }
};

// Controller to retrieve all installation requests
exports.getInstallations = async (req, res) => {
  try {
    const installations = await Installation.find();
    res.status(200).json(installations);
  } catch (error) {
    console.error('Error fetching installations:', error);
    res.status(500).json({ message: 'Failed to fetch installations', error });
  }
};

// Controller to retrieve a single installation request by ID
exports.getInstallationById = async (req, res) => {
  try {
    const installation = await Installation.findById(req.params.id);
    if (!installation) {
      return res.status(404).json({ message: 'Installation request not found' });
    }
    res.status(200).json(installation);
  } catch (error) {
    console.error('Error fetching installation:', error);
    res.status(500).json({ message: 'Failed to fetch installation request', error });
  }
};

// Controller to update an installation request by ID
exports.updateInstallation = async (req, res) => {
  try {
    const installation = await Installation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!installation) {
      return res.status(404).json({ message: 'Installation request not found' });
    }
    res.status(200).json({ message: 'Installation request updated successfully', installation });
  } catch (error) {
    console.error('Error updating installation:', error);
    res.status(500).json({ message: 'Failed to update installation request', error });
  }
};

// Controller to update the installation date
exports.updateInstallationDate = async (req, res) => {
  try {
    const { id } = req.params;
    const { date } = req.body;

    if (!date) {
      return res.status(400).json({ message: 'New date is required' });
    }

    const updatedInstallation = await Installation.findByIdAndUpdate(
      id,
      { installationDate: date },
      { new: true, runValidators: true }
    );

    if (!updatedInstallation) {
      return res.status(404).json({ message: 'Installation request not found' });
    }

    res.status(200).json({ message: 'Installation date updated successfully', updatedInstallation });
  } catch (error) {
    console.error('Error updating installation date:', error);
    res.status(500).json({ message: 'Failed to update installation date', error });
  }
};

// Controller to delete an installation request by ID
exports.deleteInstallation = async (req, res) => {
  try {
    const installation = await Installation.findByIdAndDelete(req.params.id);
    if (!installation) {
      return res.status(404).json({ message: 'Installation request not found' });
    }
    res.status(200).json({ message: 'Installation request deleted successfully' });
  } catch (error) {
    console.error('Error deleting installation:', error);
    res.status(500).json({ message: 'Failed to delete installation request', error });
  }
};

// Controller to update additional notes for an installation request
exports.updateAdditionalNotes = async (req, res) => {
  try {
    const { id } = req.params;
    const { notes } = req.body;

    if (!notes) {
      return res.status(400).json({ message: 'Additional notes are required' });
    }

    const updatedInstallation = await Installation.findByIdAndUpdate(
      id,
      { notes },
      { new: true, runValidators: true }
    );

    if (!updatedInstallation) {
      return res.status(404).json({ message: 'Installation request not found' });
    }

    res.status(200).json({ message: 'Additional notes updated successfully', updatedInstallation });
  } catch (error) {
    console.error('Error updating additional notes:', error);
    res.status(500).json({ message: 'Failed to update additional notes', error });
  }
};