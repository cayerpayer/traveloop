/* ============================================
   Trip Controller — CRUD operations for trips.
   ============================================ */

import Trip from '../models/Trip.js';

/**
 * @desc    Get all trips for current user
 * @route   GET /api/trips
 * @access  Private
 */
export const getTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user._id }).sort('-createdAt');
    res.json({ success: true, count: trips.length, trips });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get single trip
 * @route   GET /api/trips/:id
 * @access  Private
 */
export const getTrip = async (req, res) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, user: req.user._id });
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.json({ success: true, trip });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Create trip
 * @route   POST /api/trips
 * @access  Private
 */
export const createTrip = async (req, res) => {
  try {
    const trip = await Trip.create({ ...req.body, user: req.user._id });
    res.status(201).json({ success: true, trip });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Update trip
 * @route   PUT /api/trips/:id
 * @access  Private
 */
export const updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.json({ success: true, trip });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Delete trip
 * @route   DELETE /api/trips/:id
 * @access  Private
 */
export const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.json({ success: true, message: 'Trip deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
