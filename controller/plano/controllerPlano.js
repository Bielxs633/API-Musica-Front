/**
 * 
 *  Objetivo: Controller responsável pela manupilação do CRUD de dados do plano.
 *  Data: 17/04/25
 *  Autor: Gabriel
 *  Versão: 1.0
 * 
 **/

// Import do arquivo de configurações de menssagens de status code.
const MESSAGE = require('../../modulo/config.js')

// Import do arquivo DAO do plano para manipular o BD.
const planoDAO = require('../../model/dao/plano.js')
const { json } = require('body-parser')

///---------------------------------------------------------------------------------------------------------------------
//______________________________________________________________________________________________________________________

// Função para inserir um plano.
const inserirPlano = async function(plano, contentType){

    // try catch é uma forma de tratar o código para que a API não caia
    try {

        if(String(contentType) == 'application/json')
        {
        if( plano.nome           == undefined || plano.nome                 == '' || plano.nome             == null || plano.nome.lenght > 100               ||
            plano.preco          == undefined || plano.preco                == '' || plano.preco            == null || plano.preco.lenght > 20               ||
            plano.beneficios     == undefined || plano.beneficios           == '' || plano.beneficios       == null || plano.beneficios.lenght > 200
        ){
            return MESSAGE.ERROR_REQUIRED_FIEDLS //$ 400
        }else{
            let resultPlano = await planoDAO.insertPlano(plano)

            //? Só precisa do uso das Chaves ( {} ) se for mais de uma saida no return;
            if(resultPlano)
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

// Função para atulizar um plano.
const atualizarPlano = async function(plano, id, contentType){

    try {
        
        if(String(contentType) == 'application/json')
            {
            if( plano.nome           == undefined || plano.nome                 == '' || plano.nome             == null || plano.nome.lenght > 100               ||
                plano.preco          == undefined || plano.preco                == '' || plano.preco            == null || plano.preco.lenght > 20               ||
                plano.beneficios     == undefined || plano.beneficiosduracao    == '' || plano.beneficios       == null || plano.beneficios.lenght > 200         ||
                id == "" || id == undefined || id == null || isNaN(id) || id <= 0
            ){
                return MESSAGE.ERROR_REQUIRED_FIEDLS //$ 400
            }else{
                // Validar se o ID existe no BD
                let resultPlano = await buscarPlano(id)

                if(resultPlano.status_code == 200){
                    // Update
                    // Adiciona um atributo ID no JSON e coloca o id do plano que chegou na controller
                    plano.id = id

                    let result = await planoDAO.updatePlano(plano)

                    if(result){
                        return MESSAGE.SUCCESS_UPDATE_ITEM //$ 200
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //$ 500
                    }

                }else if(resultPlano.status_code == 404){
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

// Função para deletar um plano.
const excluirPlano = async function(id){

    try {
        if(id == "" || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIEDLS //$ 400

        }else{
            // Validar se o ID existe
            let resultPlano = await buscarPlano(id)

            if(resultPlano.status_code == 200){
                // Delete
                let result = await planoDAO.deletePlano(id)

                if(result){
                    return MESSAGE.SUCCESS_DELETED_ITEM //$ 200
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //$ 500
                }

            }else if(resultPlano.status_code == 404){
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

// Função para retornar todos os planos.
const listarPlano = async function(){

    try {
        
        let  dadosPlano = {}

        // Chamar a função que retorna todos os planos
        let resultPlano = await planoDAO.selectAllPlano()

        if(resultPlano != false || typeof(resultPlano) == 'object'){

            if(resultPlano.length > 0){   
                // Criando um objeto JSON para retornar a lista de planos
                dadosPlano.status = true
                dadosPlano.status_code = 200
                dadosPlano.items = resultPlano.length
                dadosPlano.plano = resultPlano
    
                return dadosPlano //$ 200

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

// Função para buscar um plano pelo ID.
const buscarPlano = async function(id){

    try {

        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIEDLS //$ 400

        }else{
            let dadosPlano = {}

            let resultPlano = await planoDAO.selectByIdPlano(id)

            if(resultPlano != false || typeof(resultPlano) == 'object'){
                if(resultPlano.length > 0){
                dadosPlano.status = true
                dadosPlano.status_code = 200
                dadosPlano.plano = resultPlano

                    return dadosPlano //$ 200

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
    inserirPlano,
    atualizarPlano,
    excluirPlano,
    listarPlano,
    buscarPlano
}
