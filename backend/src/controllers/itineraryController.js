/* ============================================
   Itinerary Controller — Manage itinerary
   activities for trips.
   ============================================ */

import Activity from '../models/Activity.js';

/**
 * @desc    Get all activities for a trip
 * @route   GET /api/itineraries/:tripId
 * @access  Private
 */
export const getItinerary = async (req, res) => {
  try {
    const activities = await Activity.find({ trip: req.params.tripId }).sort('dayIndex startTime');
    res.json({ success: true, activities });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Add activity to itinerary
 * @route   POST /api/itineraries/:tripId/activities
 * @access  Private
 */
export const addActivity = async (req, res) => {
  try {
    const activity = await Activity.create({ ...req.body, trip: req.params.tripId });
    res.status(201).json({ success: true, activity });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Update activity
 * @route   PUT /api/itineraries/:tripId/activities/:activityId
 * @access  Private
 */
export const updateActivity = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.activityId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!activity) return res.status(404).json({ message: 'Activity not found' });
    res.json({ success: true, activity });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Delete activity
 * @route   DELETE /api/itineraries/:tripId/activities/:activityId
 * @access  Private
 */
export const deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.activityId);
    if (!activity) return res.status(404).json({ message: 'Activity not found' });
    res.json({ success: true, message: 'Activity deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
