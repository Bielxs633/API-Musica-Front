/**
 * 
 *  Objetivo: Arquivo de configuração do projeto, onde teremos mensagens padronizadas, variáveis e constantes para o projeto.
 *  Data: 13/02/25
 *  Autor: Gabriel
 *  Versão: 1.0
 * 
 **/

//: ********************* Mensagens de Status Code para API *********************
//______________________________________________________________________________________________________________________

//! ******************** Mensagens de Erro ********************

const ERROR_REQUIRED_FIEDLS             = {status: false, status_code: 400, message: "Existem campos com preenchimento obrigatórios que não foram encaminhados."}
const ERROR_NOT_FOUND                   = {status: false, status_code: 404, message: "não foram encaminhados dados para retornar."}
const ERROR_CONTENT_TYPE                = {status: false, status_code: 415, message: "Não foi possivel processar a requicição, o tipo de dados encaminhados deve ser JSON."}
const ERROR_INTERNAL_SERVER_MODEL       = {status: false, status_code: 500, message: "Deivido a um erro interno no servidor de modelagem de dados, não foi possivel processar a requisição."}
const ERROR_INTERNAL_SERVER_CONTROLLER  = {status: false, status_code: 500, message: "Deivido a um erro interno no servidor de controler de dados, não foi possivel processar a requisição."}

//______________________________________________________________________________________________________________________

//* ******************* Mensagens de Sucesso *******************

const SUCCESS_CREATE_ITEM = {status: true, status_code: 201, message: "Item criado com sucesso!"}
const SUCCESS_DELETED_ITEM = {status: true, status_code: 200, message: "Item excluido com sucesso!"}
const SUCCESS_UPDATE_ITEM = {status: true, status_code: 200, message: "Item atualizado com sucesso!"}

//______________________________________________________________________________________________________________________

module.exports = {
    ERROR_REQUIRED_FIEDLS,    
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_CONTENT_TYPE,
    ERROR_NOT_FOUND,    
    SUCCESS_CREATE_ITEM,
    SUCCESS_DELETED_ITEM,
    SUCCESS_UPDATE_ITEM
}