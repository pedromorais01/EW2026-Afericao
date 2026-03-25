import json
import os

def transform():
    input_path = os.path.join('..', 'dataset_reparacoes.json')
    output_path = 'reparacoes_transformed.json'
    
    with open(input_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    reparacoes = data['reparacoes']
    
    # Add _id to each record
    for i, rep in enumerate(reparacoes):
        rep['_id'] = str(i + 1)
        
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(reparacoes, f, indent=2, ensure_ascii=False)

if __name__ == "__main__":
    transform()
