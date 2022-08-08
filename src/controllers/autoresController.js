import Autor from "../models/Autor.js";

class AutorController {

     static listarAutores (req, res) {
          Autor.find({},(err, autores) => {
               res.json(autores)
          })
     } 

     static listarAutorID (req, res) {
          const {id} = req.params

          Autor.findById(id, (err, autor) => {
               if (err) {
                    res.status(400).send({message: `${err.message} - ID do autor não localizado.`})
               }

               res.status(200).send(autor)
          })
     }

     static cadastrarAutor (req, res) {
          let autor = new Autor(req.body)

          autor.save((err) => {
               if (err) {
                    res.status(500).send({message: `${err.message} - falha ao cadastrar o autor.`})
               }

               res.status(201).send(JSON.stringify(Autor))
          })
     }

     static atualizarAutor (req, res) {
          const {id} = req.params

          Autor.findByIdAndUpdate(id, {$set: req.body}, (err) => {
               if (err){
                    res.status(500).send({message: err.message})
               }
               
               res.status(200).send({message: 'Autor atualizado com sucesso'})
          })
     }

     static excluirAutor (req, res) {
          const {id} = req.params

          Autor.findByIdAndDelete(id, (err) => {
               if (err) {
                    res.status(500).send({message: err.message})
               }

               res.status(200).send({message: 'Autor removido com sucesso'})
          })
     }
}

export default AutorController