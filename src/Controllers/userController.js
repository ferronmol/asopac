/*const User = require('../Routes/Models/UserModel');
const Patient = require('../Routes/Models/PatientModel');

exports.getUser = async (req, res) => {
    const userId = req.params.id;

    try {
        //Uso populate para traer los datos del paciente
        const user = await User.findById(userId).populate('patient');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error getting user' });
    }
}; */
