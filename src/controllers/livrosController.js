import livros from "../models/Livro.js";
import Livro from "../models/Livro.js";

class LivroController {

     static listarLivros (req, res) {
          Livro.find()
               .populate('autor')
               .exec((err, livros) => {
                    res.status(200).json(livros)
               })
     } 

     static listarLivroID (req, res) {
          const {id} = req.params

          Livro.findById(id)
               .populate('autor', 'nome')
               .exec((err, livro) => {
                    if (err) {
                         res.status(400).send({message: `${err.message} - ID do livro não localizado.`})
                    }

               res.status(200).send(livro)
          })
     }

     static cadastrarLivro (req, res) {
          let livro = new Livro(req.body)

          livro.save((err) => {
               if (err) {
                    res.status(500).send({message: `${err.message} - falha ao cadastrar o livro.`})
               }

               res.status(201).send(JSON.stringify(Livro))
          })
     }

     static atualizarLivro (req, res) {
          const {id} = req.params

          Livro.findByIdAndUpdate(id, {$set: req.body}, (err) => {
               if (err){
                    res.status(500).send({message: err.message})
               }
               
               res.status(200).send({message: 'Livro atualizado com sucesso'})
          })
     }

     static excluirLivro (req, res) {
          const {id} = req.params

          Livro.findByIdAndDelete(id, (err) => {
               if (err) {
                    res.status(500).send({message: err.message})
               }

               res.status(200).send({message: 'Livro removido com sucesso'})
          })
     }

     static listarLivroPorEditora (req, res) {
          const editora = req.query.editora

          Livro.find({'editora': editora}, {}, (err, livros) => {
               if (err){
                    res.status(400).send({message: 'Editora não encontrada'})
               }
               
               res.status(200).send(livros)
          })
     }
}

export default LivroController