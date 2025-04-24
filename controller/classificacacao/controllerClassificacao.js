/**
 * 
 *  Objetivo: Controller responsável pela manupilação do CRUD de dados da classificacao.
 *  Data: 17/04/25
 *  Autor: Gabriel
 *  Versão: 1.0
 * 
 **/

// Import do arquivo de configurações de menssagens de status code.
const MESSAGE = require('../../modulo/config.js')

// Import do arquivo DAO da classificacao para manipular o BD.
const ClassificacaoDAO = require('../../model/dao/classificacao.js')
const { json } = require('body-parser')

///---------------------------------------------------------------------------------------------------------------------
//______________________________________________________________________________________________________________________

// Função para inserir uma classificacao.
const inserirClassificacao = async function(classificacao, contentType){

    // try catch é uma forma de tratar o código para que a API não caia
    try {

        if(String(contentType) == 'application/json')
        {
        if( classificacao.nome       == undefined || classificacao.nome       == '' || classificacao.nome         == null || classificacao.nome.lenght > 50             
        ){
            return MESSAGE.ERROR_REQUIRED_FIEDLS //$ 400
        }else{
            let resultClassificacao = await ClassificacaoDAO.insertClassificacao(classificacao)

            //? Só precisa do uso das Chaves ( {} ) se for mais de uma saida no return;
            if(resultClassificacao)
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

// Função para atulizar uma classificacao.
const atualizarClassificacao = async function(classificacao, id, contentType){

    try {
        
        if(String(contentType) == 'application/json')
            {
            if( classificacao.nome        == undefined || classificacao.nome      == '' || classificacao.nome         == null || classificacao.nome.lenght > 60     ||
                id == "" || id == undefined || id == null || isNaN(id) || id <= 0
            ){
                return MESSAGE.ERROR_REQUIRED_FIEDLS //$ 400
            }else{
                // Validar se o ID existe no BD
                let resultClassificacao = await buscarClassificacao(id)

                if(resultClassificacao.status_code == 200){
                    // Update
                    // Adiciona um atributo ID no JSON e coloca o id da classificacao que chegou na controller
                    classificacao.id = id

                    let result = await ClassificacaoDAO.updateClassificacao(classificacao)

                    if(result){
                        return MESSAGE.SUCCESS_UPDATE_ITEM //$ 200
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //$ 500
                    }

                }else if(resultClassificacao.status_code == 404){
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

// Função para deletar uma classificacao.
const excluirClassificacao = async function(id){

    try {
        if(id == "" || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIEDLS //$ 400

        }else{
            // Validar se o ID existe
            let resultClassificacao = await buscarClassificacao(id)

            if(resultClassificacao.status_code == 200){
                // Delete
                let result = await ClassificacaoDAO.deleteClassificacao(id)

                if(result){
                    return MESSAGE.SUCCESS_DELETED_ITEM //$ 200
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //$ 500
                }

            }else if(resultClassificacao.status_code == 404){
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

// Função para retornar todas as classificacoes.
const listarClassificacao = async function(){

    try {
        
        let  dadosClassificacao = {}

        // Chamar a função que retorna todas as classificacoes
        let resultClassificacao = await ClassificacaoDAO.selectAllClassificacao()

        if(resultClassificacao != false || typeof(resultClassificacao) == 'object'){

            if(resultClassificacao.length > 0){   
                // Criando um objeto JSON para retornar a lista de classificacoes
                dadosClassificacao.status = true
                dadosClassificacao.status_code = 200
                dadosClassificacao.items = resultClassificacao.length
                dadosClassificacao.classificacao = resultClassificacao
    
                return dadosClassificacao //$ 200

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

// Função para buscar uma classificacao pelo ID.
const buscarClassificacao = async function(id){

    try {

        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIEDLS //$ 400

        }else{
            let dadosClassificacao = {}

            let resultClassificacao = await ClassificacaoDAO.selectByIdClassificacao(id)

            if(resultClassificacao != false || typeof(resultClassificacao) == 'object'){
                if(resultClassificacao.length > 0){
                dadosClassificacao.status = true
                dadosClassificacao.status_code = 200
                dadosClassificacao.classificacao = resultClassificacao

                    return dadosClassificacao //$ 200

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
    inserirClassificacao,
    atualizarClassificacao,
    excluirClassificacao,
    listarClassificacao,
    buscarClassificacao
}
