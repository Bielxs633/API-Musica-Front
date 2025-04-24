/**
 * 
 *  Objetivo: Controller responsável pela manupilação do CRUD de dados da playlist.
 *  Data: 17/04/25
 *  Autor: Gabriel
 *  Versão: 1.0
 * 
 **/

// Import do arquivo de configurações de menssagens de status code.
const MESSAGE = require('../../modulo/config.js')

// Import do arquivo DAO da playlist para manipular o BD.
const playlistDAO = require('../../model/dao/playlist.js')
const { json } = require('body-parser')

///---------------------------------------------------------------------------------------------------------------------
//______________________________________________________________________________________________________________________

// Função para inserir uma playlist.
const inserirPlaylist = async function(playlist, contentType){

    // try catch é uma forma de tratar o código para que a API não caia
    try {

        if(String(contentType) == 'application/json')
        {
        if( playlist.nome            == undefined || playlist.nome            == '' || playlist.nome           == null || playlist.nome.lenght > 30               ||
            playlist.data_criacao    == undefined || playlist.data_criacao    == '' || playlist.data_criacao   == null || playlist.data_criacao.lenght > 10       ||
            playlist.duracao         == undefined || playlist.duracao         == '' || playlist.duracao        == null || playlist.duracao.lenght > 5             ||
            playlist.foto_capa       == undefined || playlist.foto_capa.lenght > 200 
        ){
            return MESSAGE.ERROR_REQUIRED_FIEDLS //$ 400
        }else{
            let resultPlaylist = await playlistDAO.insertPlaylist(playlist)

            //? Só precisa do uso das Chaves ( {} ) se for mais de uma saida no return;
            if(resultPlaylist)
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

// Função para atulizar uma playlist.
const atualizarPlaylist = async function(playlist, id, contentType){

    try {
        
        if(String(contentType) == 'application/json')
            {
            if( playlist.nome            == undefined || playlist.nome            == ''  || playlist.nome           == null || playlist.nome.lenght > 30               ||
                playlist.data_criacao    == undefined || playlist.data_criacao    == ''  || playlist.data_criacao   == null || playlist.data_criacao.lenght > 10       ||
                playlist.duracao         == undefined || playlist.duracao         == ''  || playlist.duracao        == null || playlist.duracao.lenght > 5             ||
                playlist.foto_capa       == undefined || playlist.foto_capa.lenght > 200 ||
                id == "" || id == undefined || id == null || isNaN(id) || id <= 0
            ){
                return MESSAGE.ERROR_REQUIRED_FIEDLS //$ 400
            }else{
                // Validar se o ID existe no BD
                let resultPlaylist = await buscarPlaylist(id)

                if(resultPlaylist.status_code == 200){
                    // Update
                    // Adiciona um atributo ID no JSON e coloca o id da playlist que chegou na controller
                    playlist.id = id

                    let result = await playlistDAO.updatePlaylist(playlist)

                    if(result){
                        return MESSAGE.SUCCESS_UPDATE_ITEM //$ 200
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //$ 500
                    }

                }else if(resultPlaylist.status_code == 404){
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

// Função para deletar uma playlist.
const excluirPlaylist = async function(id){

    try {
        if(id == "" || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIEDLS //$ 400

        }else{
            // Validar se o ID existe
            let resultPlaylist = await buscarPlaylist(id)

            if(resultPlaylist.status_code == 200){
                // Delete
                let result = await playlistDAO.deletePlaylist(id)

                if(result){
                    return MESSAGE.SUCCESS_DELETED_ITEM //$ 200
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //$ 500
                }

            }else if(resultPlaylist.status_code == 404){
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

// Função para retornar todas as playlists.
const listarPlaylist = async function(){

    try {
        
        let  dadosPlaylist = {}

        // Chamar a função que retorna todas as playlists
        let resultPlaylist = await playlistDAO.selectAllPlaylist()

        if(resultPlaylist != false || typeof(resultPlaylist) == 'object'){

            if(resultPlaylist.length > 0){   
                // Criando um objeto JSON para retornar a lista de playlists
                dadosPlaylist.status = true
                dadosPlaylist.status_code = 200
                dadosPlaylist.items = resultPlaylist.length
                dadosPlaylist.playlist = resultPlaylist
    
                return dadosPlaylist //$ 200

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

// Função para buscar uma playlist pelo ID.
const buscarPlaylist = async function(id){

    try {

        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIEDLS //$ 400

        }else{
            let dadosPlaylist = {}

            let resultPlaylist = await playlistDAO.selectByIdPlaylist(id)

            if(resultPlaylist != false || typeof(resultPlaylist) == 'object'){
                if(resultPlaylist.length > 0){
                dadosPlaylist.status = true
                dadosPlaylist.status_code = 200
                dadosPlaylist.playlist = resultPlaylist

                    return dadosPlaylist //$ 200

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
    inserirPlaylist,
    atualizarPlaylist,
    excluirPlaylist,
    listarPlaylist,
    buscarPlaylist
}
