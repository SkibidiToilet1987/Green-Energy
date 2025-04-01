const Installation = require('../models/installationModel');

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

exports.getInstallations = async (req, res) => {
  try {
    const installations = await Installation.find();
    res.status(200).json(installations);
  } catch (error) {
    console.error('Error fetching installations:', error);
    res.status(500).json({ message: 'Failed to fetch installations', error });
  }
};