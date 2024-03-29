// Importar modelo
const model = require('../models/card');
const cuentaModel = require('../models/cuenta')

// Definir controlador (funciones disponibles)
const controller = {

    // Devuelve el número de tarjetas registrados
    getCount: async(req, res) => {
        c = await model.countDocuments({});
        res.json({count: c})
    },

    // Devuelve todas las tarjetas registradas
    getAll: async(req, res) => {
        cards = await model.find();
        res.json({tarjetas: cards});
    },

    // Inserta una tarjeta en la db
    postCard: async(req,res)  => {
        const {clienteSeleccionado, nro, pin, fechavto,cvv} = req.body

        // Control de parámetros
        if (!clienteSeleccionado) return res.status(400).json({message:"Cliente no especificado"});
    
        // Si existe una tarjeta con el mismo número, se cancela la operación
        const existsNumber = await model.findOne({nro: nro})
        if (existsNumber) return res.status(400).json({message: "Número de tarjeta ya utilizado"})

        const newCard = new model({
            cliente:clienteSeleccionado,
            nro:nro,
            pin:pin,
            fechavto:fechavto,
            cvv: cvv,
            ban: false,
        })
        const savedCard = await newCard.save() 
        
        // También creamos la cuenta asociada
        const lastCBU = await cuentaModel.find({}, "cbu -_id").sort({ cbu: -1}).limit(1)
        const nuevoCBU = lastCBU.length ? (lastCBU[0].cbu + 1) : 1
 
        const nuevaCuenta = new cuentaModel({
            cliente: clienteSeleccionado,
            tarjeta: savedCard._id,
            tipo: "Cuenta corriente en pesos",
            monto: 0.00,
            cbu: nuevoCBU
        })

        await nuevaCuenta.save()
        res.redirect('/front/cards')
    },

    // Busca la tarjeta asociada al número pasado por parámetro y devuelve el PIN junto al ID
    getPin: async(req, res) => {
        const nro = req.params.nro
        if (!nro) return res.status(400).json({message: "Número no especificado"})

        const tarjeta = await model.findOne({nro: nro})
        if (!tarjeta) return res.status(400).json({message: "Tarjeta no registrada en el sistema"})
        if (tarjeta.ban) return res.status(400).json({message: "La tarjeta se encuentra bloqueada"})
        return res.json({pin: tarjeta.pin, tarjetaId: tarjeta.id})
    },

    // Setea en true el campo "ban" de la tarjeta indicada por id
    banearTarjeta: async(req,res) => {
        const id = req.params.id
        if (!id) return res.status(400).json({message: "ID no especificado"})

        const tarjeta = await model.findById(id);
        if (!tarjeta) return res.status(400).json({message: "No se encontró la tarjeta en el sistema"})

        const doc = await model.findByIdAndUpdate(req.params.id, {ban: true}, { new: true });

        const result = await doc.save();
        return result ? res.redirect('/front/cards') : res.status(400).json({message: "Error al actualizar"});
    },

    // Setea en false el campo "ban" de la tarjeta indicada por id 
    desbanearTarjeta: async(req,res) => {
        const id = req.params.id
        if (!id) return res.status(400).json({message: "ID no especificado"})

        const tarjeta = await model.findById(id);
        if (!tarjeta) return res.status(400).json({message: "No se encontró la tarjeta en el sistema"})

        const doc = await model.findByIdAndUpdate(req.params.id, {ban: false}, { new: true });

        const result = await doc.save();
        return result ? res.redirect('/front/cards') : res.status(400).json({message: "Error al actualizar"});
    },

    // Elimina una tarjeta de manera permanente
    deleteCard: async(req, res) => {
        const id = req.params.id
        if (!id) return res.status(400).json({message: "ID no especificado"})

        const card = await model.findById(id)
        if (!card) return res.status(400).json({message: "ID no encontrado en la base de datos"})

        // Borrar también la cuenta asociada (si existe)
        const cuenta = await cuentaModel.findOne({tarjeta: id})
        if (cuenta) await cuenta.deleteOne()

        const result = await card.deleteOne()
        return result ? res.redirect('/front/cards') : res.status(400).json({message: "Error al borrar"}) 
    }
}

module.exports = controller;