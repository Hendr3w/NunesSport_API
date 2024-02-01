import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Produto.module.css';

const ProdutosComponent = () => {
  const [produtos, setProdutos] = useState([]);
  const [produtoForm, setProdutoForm] = useState({
    id: 0,
    codProduto: '',
    nome: '',
    valorProduto: 0,
    descProduto: '',
  });


  const apiUrl = 'http://localhost:5000/produto';

  useEffect(() => {
    carregarProdutos();
  }, []); 

  const carregarProdutos = async () => {
    try {
      const resp = await axios.get(`${apiUrl}/listar`);
      setProdutos(resp.data);
    } catch (error) {
      console.error("Erro ao carregar a lista de produtos", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProdutoForm((prevProduto) => ({
      ...prevProduto,
      [name]: value,
    }));
  };

  const salvarProduto = async (e) => {
    e.preventDefault();

    if (!produtoForm.codProduto) {
      console.error('Código do produto não fornecido.');
      return;
    }

    try {
        await axios.post(`${apiUrl}/cadastrar`, produtoForm);
        carregarProdutos();


        //setProdutoForm.id(1)

        //await axios.post(`${apiUrl}/cadastrar`, produtoForm);

        setProdutoForm({
            id: 0,
            codProduto: '',
            nome: '',
            valorProduto: 0,
            descProduto: '',
        });

      console.log('Produto salvo com sucesso!');
    } catch (error) {
            console.error('Erro ao salvar produto:', error);
    }
  };


    const deletarProduto = async (cod) => {
        try {
            await axios.delete(`${apiUrl}/deletar?cod=${cod}`);
            carregarProdutos();
        
            console.log('Produto excluído com sucesso!');
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
        }
    };


    const [produtoSelecionado, setProdutoSelecionado] = useState(null);

    const selecionarProduto = (produto) => {
        setProdutoSelecionado(produto);
        setProdutoForm({
          id: produto.id,
          codProduto: produto.codProduto,
          nome: produto.nome,
          valorProduto: produto.valorProduto,
          descProduto: produto.descProduto,
        });
      };

    const excluirProduto = async () => {
        if (!produtoSelecionado) {
          console.error('Nenhum produto selecionado para excluir.');
          return;
        }
      
        try {
          await axios.delete(`${apiUrl}/deletar?cod=${produtoSelecionado.codProduto}`);
          carregarProdutos();
          console.log('Produto excluído com sucesso!');
          limparSelecao();
        } catch (error) {
          console.error('Erro ao excluir produto:', error);
        }
      };

    const limparSelecao = () => {
        setProdutoSelecionado(null);
        setProdutoForm({
          id: 0,
          codProduto: '',
          nome: '',
          valorProduto: 0,
          descProduto: '',
        });
      };

    const alterarProduto = async () => {
        if (!produtoSelecionado) {
            console.error('Nenhum produto selecionado para excluir.');
            return;
        }
    
        try {

            setProdutoForm(produtoSelecionado)
            await axios.put(`${apiUrl}/alterar`, produtoForm);
            carregarProdutos();
    
    
            //setProdutoForm.id(1)
    
            //await axios.post(`${apiUrl}/cadastrar`, produtoForm);
    
            setProdutoForm({
                id: 0,
                codProduto: '',
                nome: '',
                valorProduto: 0,
                descProduto: '',
            });
    
          console.log('Produto salvo com sucesso!');
        } catch (error) {
                console.error('Erro ao salvar produto:', error);
        }
      };


    return (
        <div className="container">
            <h2>Cadastro e Alteração de Produtos</h2>

            <div>
                <form onSubmit={salvarProduto}>
                    <div>
                    <label htmlFor="nome">Nome:</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={produtoForm.nome || ''}
                        onChange={handleChange}
                    />
                    </div>
                    <div>
                    <label htmlFor="codProduto">Código do Produto:</label>
                    <input
                        type="text"
                        id="codProduto"
                        name="codProduto"
                        value={produtoForm.codProduto || ''}
                        onChange={handleChange}
                    />
                    </div>
                    <div>
                    <label htmlFor="descProduto">Descrição do Produto:</label>
                    <input
                        type="text"
                        id="descProduto"
                        name="descProduto"
                        value={produtoForm.descProduto || ''}
                        onChange={handleChange}
                    />
                    </div>
                    <div>
                    <label htmlFor="valorProduto">Valor do Produto:</label>
                    <input
                        type="number"
                        id="valorProduto"
                        name="valorProduto"
                        value={produtoForm.valorProduto || 0} 
                        onChange={handleChange}
                        step="0.01"
                    />
                    </div>
                    <button type="submit">Cadastrar Produto</button>
                </form>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Código</th>
                        <th>Descrição</th>
                        <th>Valor</th>
                        <th>Ações</th>
                    </tr>
                </thead>
            
                <tbody>
                    {produtos.map((produto) => (
                    <tr key={produto.id} onClick={() => selecionarProduto(produto)}>
                    <td>{produto.nome}</td>
                    <td>{produto.codProduto}</td>
                    <td>{produto.descProduto}</td>
                    <td>{produto.valorProduto}</td>
                    <td>
                        <button onClick={(e) => { e.stopPropagation(); excluirProduto(); }}>
                        Excluir
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); alterarProduto(); }}>
                        Alterar
                    </button>
                    </td>
                    </tr>
                    ))}
                </tbody> 
            </table>               
        </div>
    );
};

export default ProdutosComponent;
