import User from '../models/User.js';

export const getAllOwners = async (req, res) => {
  try {
    const owners = await User.find({ role: 'owner' }).select('-password');
    res.json(owners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createOwner = async (req, res) => {
  try {
    const { name, email, password, flatNo } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const owner = await User.create({
      name,
      email,
      password,
      flatNo,
      role: 'owner'
    });

    res.status(201).json({
      _id: owner._id,
      name: owner.name,
      email: owner.email,
      flatNo: owner.flatNo,
      role: owner.role
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOwner = async (req, res) => {
  try {
    const owner = await User.findById(req.params.id);

    if (!owner) {
      return res.status(404).json({ message: 'Owner not found' });
    }

    owner.name = req.body.name || owner.name;
    owner.email = req.body.email || owner.email;
    owner.flatNo = req.body.flatNo || owner.flatNo;
    
    if (req.body.password) {
      owner.password = req.body.password;
    }

    const updatedOwner = await owner.save();

    res.json({
      _id: updatedOwner._id,
      name: updatedOwner.name,
      email: updatedOwner.email,
      flatNo: updatedOwner.flatNo,
      role: updatedOwner.role
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteOwner = async (req, res) => {
  try {
    const owner = await User.findById(req.params.id);

    if (!owner) {
      return res.status(404).json({ message: 'Owner not found' });
    }

    await User.deleteOne({ _id: req.params.id });
    res.json({ message: 'Owner deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchOwners = async (req, res) => {
  try {
    const { search } = req.query;
    const query = {
      role: 'owner',
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { flatNo: { $regex: search, $options: 'i' } }
      ]
    };

    const owners = await User.find(query).select('-password');
    res.json(owners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};