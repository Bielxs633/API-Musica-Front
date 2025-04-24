/**
 * 
 *  Objetivo: Controller responsável pela manupilação do CRUD de dados do genero.
 *  Data: 17/04/25
 *  Autor: Gabriel
 *  Versão: 1.0
 * 
 **/

// Import do arquivo de configurações de menssagens de status code.
const MESSAGE = require('../../modulo/config.js')

// Import do arquivo DAO do genero para manipular o BD.
const generoDAO = require('../../model/dao/genero.js')
const { json } = require('body-parser')

///---------------------------------------------------------------------------------------------------------------------
//______________________________________________________________________________________________________________________

// Função para inserir um genero.
const inserirGenero = async function(genero, contentType){

    // try catch é uma forma de tratar o código para que a API não caia
    try {

        if(String(contentType) == 'application/json')
        {
        if( 
            genero.nome           == undefined || genero.nome                 == '' || genero.nome             == null || genero.nome.lenght > 100              
        ){
            return MESSAGE.ERROR_REQUIRED_FIEDLS //$ 400
        }else{
            let resultGenero = await generoDAO.insertGenero(genero)

            //? Só precisa do uso das Chaves ( {} ) se for mais de uma saida no return;
            if(resultGenero)
                return MESSAGE.SUCCESS_CREATE_ITEM //$ 201
            else
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //$ 500
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE //$ 415
        }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //$ 500
    }

}

///---------------------------------------------------------------------------------------------------------------------

// Função para atulizar um genero.
const atualizarGenero = async function(genero, id, contentType){

    try {
        
        if(String(contentType) == 'application/json')
            {
            if( genero.nome           == undefined || genero.nome                 == '' || genero.nome             == null || genero.nome.lenght > 100               ||
                id == "" || id == undefined || id == null || isNaN(id) || id <= 0
            ){
                return MESSAGE.ERROR_REQUIRED_FIEDLS //$ 400
            }else{
                // Validar se o ID existe no BD
                let resultGenero = await buscarGenero(id)

                if(resultGenero.status_code == 200){
                    // Update
                    // Adiciona um atributo ID no JSON e coloca o id do genero que chegou na controller
                    genero.id = id

                    let result = await generoDAO.updateGenero(genero)

                    if(result){
                        return MESSAGE.SUCCESS_UPDATE_ITEM //$ 200
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //$ 500
                    }

                }else if(resultGenero.status_code == 404){
                    return MESSAGE.ERROR_NOT_FOUND //$ 404
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //$ 500
                }
            }         
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE //$ 415
        }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //$ 500
    }

}

///---------------------------------------------------------------------------------------------------------------------

// Função para deletar um genero.
const excluirGenero = async function(id){

    try {
        if(id == "" || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIEDLS //$ 400

        }else{
            // Validar se o ID existe
            let resultGenero = await buscarGenero(id)

            if(resultGenero.status_code == 200){
                // Delete
                let result = await generoDAO.deleteGenero(id)

                if(result){
                    return MESSAGE.SUCCESS_DELETED_ITEM //$ 200
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //$ 500
                }

            }else if(resultGenero.status_code == 404){
                return MESSAGE.ERROR_NOT_FOUND //$ 404
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //$ 500
            }

        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //$ 500
    }

}

///---------------------------------------------------------------------------------------------------------------------

// Função para retornar todos os generos.
const listarGenero = async function(){

    try {
        
        let  dadosGenero = {}

        // Chamar a função que retorna todos os generos
        let resultGenero = await generoDAO.selectAllGenero()

        if(resultGenero != false || typeof(resultGenero) == 'object'){

            if(resultGenero.length > 0){   
                // Criando um objeto JSON para retornar a lista de generos
                dadosGenero.status = true
                dadosGenero.status_code = 200
                dadosGenero.items = resultGenero.length
                dadosGenero.plano = resultGenero
    
                return dadosGenero //$ 200

            }else{
                return MESSAGE.ERROR_NOT_FOUND //$ 404
            }
        }else{
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //$ 500
        }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //$ 500
    }

}

///---------------------------------------------------------------------------------------------------------------------

// Função para buscar um genero pelo ID.
const buscarGenero = async function(id){

    try {

        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIEDLS //$ 400

        }else{
            let dadosGenero = {}

            let resultGenero = await generoDAO.selectByIdGenero(id)

            if(resultGenero != false || typeof(resultGenero) == 'object'){
                if(resultGenero.length > 0){
                dadosGenero.status = true
                dadosGenero.status_code = 200
                dadosGenero.genero = resultGenero

                    return dadosGenero //$ 200

                }else{
                    return MESSAGE.ERROR_NOT_FOUND //$ 404
                }
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //$ 500
            }
        }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //$ 500
    }

}

//______________________________________________________________________________________________________________________
///---------------------------------------------------------------------------------------------------------------------

module.exports = {
    inserirGenero,
    atualizarGenero,
    excluirGenero,
    listarGenero,
    buscarGenero
}
