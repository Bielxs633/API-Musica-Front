/**
 * 
 *  Objetivo: Controller responsável pela manupilação do CRUD de dados da data de vigencia.
 *  Data: 17/04/25
 *  Autor: Gabriel
 *  Versão: 1.0
 * 
 **/

// Import do arquivo de configurações de menssagens de status code.
const MESSAGE = require('../../modulo/config.js')

// Import do arquivo DAO da data vigencia para manipular o BD.
const vigenciaDAO = require('../../model/dao/vigencia.js')
const { json } = require('body-parser')

///---------------------------------------------------------------------------------------------------------------------
//______________________________________________________________________________________________________________________

// Função para inserir uma data vigencia.
const inserirVigencia = async function(vigencia, contentType){

    // try catch é uma forma de tratar o código para que a API não caia
    try {

        if(String(contentType) == 'application/json')
        {
        if( 
            vigencia.data_inicio  == undefined || vigencia.data_inicio   == '' || vigencia.data_inicio  == null || vigencia.data_inicio.lenght > 10     ||
            vigencia.data_termino == undefined || vigencia.data_termino  == '' || vigencia.data_termino == null || vigencia.data_termino.lenght > 10 
        ){
            return MESSAGE.ERROR_REQUIRED_FIEDLS //$ 400
        }else{
            let resultVigencia = await vigenciaDAO.insertVigencia(vigencia)

            //? Só precisa do uso das Chaves ( {} ) se for mais de uma saida no return;
            if(resultVigencia)
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

// Função para atulizar uma data vigencia.
const atualizarVigencia = async function(vigencia, id, contentType){

    try {
        
        if(String(contentType) == 'application/json')
            {
            if( 
                vigencia.data_inicio  == undefined || vigencia.data_inicio   == '' || vigencia.data_inicio  == null || vigencia.data_inicio.lenght > 10     ||
                vigencia.data_termino == undefined || vigencia.data_termino  == '' || vigencia.data_termino == null || vigencia.data_termino.lenght > 10    ||
                id == "" || id == undefined || id == null || isNaN(id) || id <= 0
            ){
                return MESSAGE.ERROR_REQUIRED_FIEDLS //$ 400
            }else{
                // Validar se o ID existe no BD
                let resultVigencia = await buscarVigencia(id)

                if(resultVigencia.status_code == 200){
                    // Update
                    // Adiciona um atributo ID no JSON e coloca o id da vigencia que chegou na controller
                    vigencia.id = id

                    let result = await vigenciaDAO.updateVigencia(vigencia)

                    if(result){
                        return MESSAGE.SUCCESS_UPDATE_ITEM //$ 200
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //$ 500
                    }

                }else if(resultVigencia.status_code == 404){
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

// Função para deletar uma data vigencia.
const excluirVigencia = async function(id){

    try {
        if(id == "" || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIEDLS //$ 400

        }else{
            // Validar se o ID existe
            let resultVigencia = await buscarVigencia(id)

            if(resultVigencia.status_code == 200){
                // Delete
                let result = await vigenciaDAO.deleteVigencia(id)

                if(result){
                    return MESSAGE.SUCCESS_DELETED_ITEM //$ 200
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //$ 500
                }

            }else if(resultVigencia.status_code == 404){
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

// Função para retornar todas as datas vigencia.
const listarVigencia = async function(){

    try {
        
        let  dadosVigencia = {}

        // Chamar a função que retorna todas as vigencias
        let resultVigencia = await vigenciaDAO.selectAllVigencia()

        if(resultVigencia != false || typeof(resultVigencia) == 'object'){

            if(resultVigencia.length > 0){   
                // Criando um objeto JSON para retornar a lista de vigencias
                dadosVigencia.status = true
                dadosVigencia.status_code = 200
                dadosVigencia.items = resultVigencia.length
                dadosVigencia.vigencia = resultVigencia
    
                return dadosVigencia //$ 200

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

// Função para buscar uma data vigencia pelo ID.
const buscarVigencia = async function(id){

    try {

        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIEDLS //$ 400

        }else{
            let dadosVigencia = {}

            let resultVigencia = await vigenciaDAO.selectByIdVigencia(id)

            if(resultVigencia != false || typeof(resultVigencia) == 'object'){
                if(resultVigencia.length > 0){
                dadosVigencia.status = true
                dadosVigencia.status_code = 200
                dadosVigencia.vigencia = resultVigencia

                    return dadosVigencia //$ 200

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
    inserirVigencia,
    atualizarVigencia,
    excluirVigencia,
    listarVigencia,
    buscarVigencia
}