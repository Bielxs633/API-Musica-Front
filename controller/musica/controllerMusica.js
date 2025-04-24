/**
 * 
 *  Objetivo: Controller responsável pela manupilação do CRUD de dados de música.
 *  Data: 13/02/25
 *  Autor: Gabriel
 *  Versão: 1.0
 * 
 **/

// Import do arquivo de configurações de menssagens de status code.
const MESSAGE = require('../../modulo/config.js')

// Import do arquivo DAO de musica para manipular o BD.
const musicaDAO = require('../../model/dao/musica.js')
const { json } = require('body-parser')

///---------------------------------------------------------------------------------------------------------------------
//______________________________________________________________________________________________________________________

// Função para inserir uma musica.
const inserirMusica = async function(musica, contentType){

    // try catch é uma forma de tratar o código para que a API não caia
    try {

        if(String(contentType) == 'application/json')
        {
        if( musica.nome            == undefined || musica.nome             == '' || musica.nome            == null || musica.nome.lenght > 80            ||
            musica.link            == undefined || musica.link             == '' || musica.link            == null || musica.link.lenght > 200           ||
            musica.duracao         == undefined || musica.duracao          == '' || musica.duracao         == null || musica.duracao.lenght > 5          ||
            musica.data_lancamento == undefined || musica.data_lancamento  == '' || musica.data_lancamento == null || musica.data_lancamento.lenght > 10 ||
            musica.foto_capa       == undefined || musica.foto_capa.lenght > 200 ||
            musica.letra           == undefined
        ){
            return MESSAGE.ERROR_REQUIRED_FIEDLS //$ 400
        }else{
            let resultMusica = await musicaDAO.insertMusica(musica)

            //? Só precisa do uso das Chaves ( {} ) se for mais de uma saida no return;
            if(resultMusica)
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

// Função para atulizar uma musica.
const atualizarMusica = async function(musica, id, contentType){

    try {
        
        if(String(contentType) == 'application/json')
            {
            if( musica.nome            == undefined || musica.nome             == '' || musica.nome            == null || musica.nome.lenght > 80            ||
                musica.link            == undefined || musica.link             == '' || musica.link            == null || musica.link.lenght > 200           ||
                musica.duracao         == undefined || musica.duracao          == '' || musica.duracao         == null || musica.duracao.lenght > 5          ||
                musica.data_lancamento == undefined || musica.data_lancamento  == '' || musica.data_lancamento == null || musica.data_lancamento.lenght > 10 ||
                musica.foto_capa       == undefined || musica.foto_capa.lenght > 200 ||
                musica.letra           == undefined ||
                id == "" || id == undefined || id == null || isNaN(id) || id <= 0
            ){
                return MESSAGE.ERROR_REQUIRED_FIEDLS //$ 400
            }else{
                // Validar se o ID existe no BD
                let resultMusica = await buscarMusica(id)

                if(resultMusica.status_code == 200){
                    // Update
                    // Adiciona um atributo ID no JSON e coloca o id da musica que chegou na controller
                    musica.id = id

                    let result = await musicaDAO.updateMusica(musica)

                    if(result){
                        return MESSAGE.SUCCESS_UPDATE_ITEM //$ 200
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //$ 500
                    }

                }else if(resultMusica.status_code == 404){
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

// Função para deletar uma musica.
const excluirMusica = async function(id){

    try {
        if(id == "" || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIEDLS //$ 400

        }else{
            // Validar se o ID existe
            let resultMusica = await buscarMusica(id)

            if(resultMusica.status_code == 200){
                // Delete
                let result = await musicaDAO.deleteMusica(id)

                if(result){
                    return MESSAGE.SUCCESS_DELETED_ITEM //$ 200
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //$ 500
                }

            }else if(resultMusica.status_code == 404){
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

// Função para retornar todas as musicas.
const listarMusica = async function(){

    try {
        
        let  dadosMusica = {}

        // Chamar a função que retorna todas as musicas
        let resultMusica = await musicaDAO.selectAllMusica()

        if(resultMusica != false || typeof(resultMusica) == 'object'){

            if(resultMusica.length > 0){   
                // Criando um objeto JSON para retornar a lista de musicas
                dadosMusica.status = true
                dadosMusica.status_code = 200
                dadosMusica.items = resultMusica.length
                dadosMusica.musics = resultMusica
    
                return dadosMusica //$ 200

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

// Função para buscar uma musica pelo ID.
const buscarMusica = async function(id){

    try {

        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIEDLS //$ 400

        }else{
            let dadosMusica = {}

            let resultMusica = await musicaDAO.selectByIdMusica(id)

            if(resultMusica != false || typeof(resultMusica) == 'object'){
                if(resultMusica.length > 0){
                dadosMusica.status = true
                dadosMusica.status_code = 200
                dadosMusica.musics = resultMusica

                    return dadosMusica //$ 200

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
    inserirMusica,
    atualizarMusica,
    excluirMusica,
    listarMusica,
    buscarMusica
}