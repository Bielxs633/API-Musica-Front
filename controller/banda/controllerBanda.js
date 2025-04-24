/**
 * 
 *  Objetivo: Controller responsável pela manupilação do CRUD de dados da banda.
 *  Data: 17/04/25
 *  Autor: Gabriel
 *  Versão: 1.0
 * 
 **/

// Import do arquivo de configurações de menssagens de status code.
const MESSAGE = require('../../modulo/config.js')

// Import do arquivo DAO da banda para manipular o BD.
const bandaDAO = require('../../model/dao/banda.js')
const { json } = require('body-parser')

///---------------------------------------------------------------------------------------------------------------------
//______________________________________________________________________________________________________________________

// Função para inserir uma banda.
const inserirBanda = async function(banda, contentType){

    // try catch é uma forma de tratar o código para que a API não caia
    try {

        if(String(contentType) == 'application/json')
        {
        if( banda.nome            == undefined || banda.nome            == '' || banda.nome           == null || banda.nome.lenght > 60          ||
            banda.membros         == undefined || banda.membros         == '' || banda.membros        == null || banda.membros.lenght > 200      ||
            banda.data_criacao    == undefined || banda.data_criacao    == '' || banda.data_criacao   == null || banda.data_criacao.lenght > 10      
        ){
            return MESSAGE.ERROR_REQUIRED_FIEDLS //$ 400
        }else{
            let resultBanda = await bandaDAO.insertBanda(banda)

            //? Só precisa do uso das Chaves ( {} ) se for mais de uma saida no return;
            if(resultBanda)
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

// Função para atulizar uma banda.
const atualizarBanda = async function(banda, id, contentType){

    try {
        
        if(String(contentType) == 'application/json')
            {
            if( banda.nome            == undefined || banda.nome            == '' || banda.nome           == null || banda.nome.lenght > 60          ||
                banda.membros         == undefined || banda.membros         == '' || banda.membros        == null || banda.membros.lenght > 200      ||
                banda.data_criacao    == undefined || banda.data_criacao    == '' || banda.data_criacao   == null || banda.data_criacao.lenght > 10  ||
                id == "" || id == undefined || id == null || isNaN(id) || id <= 0
            ){
                return MESSAGE.ERROR_REQUIRED_FIEDLS //$ 400
            }else{
                // Validar se o ID existe no BD
                let resultBanda = await buscarBanda(id)

                if(resultBanda.status_code == 200){
                    // Update
                    // Adiciona um atributo ID no JSON e coloca o id da banda que chegou na controller
                    banda.id = id

                    let result = await bandaDAO.updateBanda(banda)

                    if(result){
                        return MESSAGE.SUCCESS_UPDATE_ITEM //$ 200
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //$ 500
                    }

                }else if(resultBanda.status_code == 404){
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

// Função para deletar uma banda.
const excluirBanda = async function(id){

    try {
        if(id == "" || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIEDLS //$ 400

        }else{
            // Validar se o ID existe
            let resultBanda = await buscarBanda(id)

            if(resultBanda.status_code == 200){
                // Delete
                let result = await bandaDAO.deleteBanda(id)

                if(result){
                    return MESSAGE.SUCCESS_DELETED_ITEM //$ 200
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //$ 500
                }

            }else if(resultBanda.status_code == 404){
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

// Função para retornar todas as bandas.
const listarBanda = async function(){

    try {
        
        let  dadosBanda = {}

        // Chamar a função que retorna todas as bandas
        let resultBanda = await bandaDAO.selectAllBandas()

        if(resultBanda != false || typeof(resultBanda) == 'object'){

            if(resultBanda.length > 0){   
                // Criando um objeto JSON para retornar a lista de bandas
                dadosBanda.status = true
                dadosBanda.status_code = 200
                dadosBanda.items = resultBanda.length
                dadosBanda.banda = resultBanda
    
                return dadosBanda //$ 200

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

// Função para buscar uma banda pelo ID.
const buscarBanda = async function(id){

    try {

        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIEDLS //$ 400

        }else{
            let dadosBanda = {}

            let resultBanda = await bandaDAO.selectByIdBanda(id)

            if(resultBanda != false || typeof(resultBanda) == 'object'){
                if(resultBanda.length > 0){
                dadosBanda.status = true
                dadosBanda.status_code = 200
                dadosBanda.banda = resultBanda

                    return dadosBanda //$ 200

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
    inserirBanda,
    atualizarBanda,
    excluirBanda,
    listarBanda,
    buscarBanda
}
