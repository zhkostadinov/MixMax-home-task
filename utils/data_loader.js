export async function load_model(model_name){
    return JSON.parse(JSON.stringify(require(`../models/entities/${model_name}.json`)));
}

export async function load_test_data(static_data_name){
    return JSON.parse(JSON.stringify(require(`../test_data/${static_data_name}.json`)));
}