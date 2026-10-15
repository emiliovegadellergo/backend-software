const getTareas = (req, res) => {
    res.status(200).json({ message: 'getTareas' })
}

const createTarea = (req, res) => {
    res.status(201).json({ message: 'createTarea' })
}

const updateTarea = (req, res) => {
    res.status(200).json({ message: `updateTarea ${req.params.id}` })
}

const deleteTarea = (req, res) => {
    res.status(200).json({ message: `deleteTarea ${req.params.id}` })
}

module.exports = {
    getTareas,
    createTarea,
    updateTarea,
    deleteTarea
} pendiente crear adentro de models tareasModel.js 
