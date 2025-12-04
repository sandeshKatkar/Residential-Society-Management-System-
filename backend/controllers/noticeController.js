import Notice from '../models/Notice.js';

export const createNotice = async (req, res) => {
  try {
    const { title, message, expiryDate } = req.body;

    const notice = await Notice.create({
      title,
      message,
      expiryDate
    });

    res.status(201).json(notice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json(notices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getActiveNotices = async (req, res) => {
  try {
    const currentDate = new Date();
    const notices = await Notice.find({
      expiryDate: { $gte: currentDate }
    }).sort({ createdAt: -1 });
    res.json(notices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateNotice = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);

    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }

    notice.title = req.body.title || notice.title;
    notice.message = req.body.message || notice.message;
    notice.expiryDate = req.body.expiryDate || notice.expiryDate;

    const updatedNotice = await notice.save();
    res.json(updatedNotice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);

    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }

    await Notice.deleteOne({ _id: req.params.id });
    res.json({ message: 'Notice deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};