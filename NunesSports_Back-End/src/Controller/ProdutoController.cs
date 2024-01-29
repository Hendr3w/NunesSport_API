using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NunesSport_Back_End.src.Data;
using NunesSport_Back_End.src.Models;

namespace NunesSports_Back_End.src.Controller{

    [ApiController]
    [Route("produto")]
    public class ProdutoController : ControllerBase
    {
        private NunesSportsDbContext? _context;

        public ProdutoController(NunesSportsDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("listar")]
        public async Task<ActionResult<IEnumerable<Produto>>> Listar()
        {
            if(_context.Produto is null)
                return NotFound();
            return await _context.Produto.ToListAsync();
        }

        [HttpPost]
        [Route("cadastrar")]
        public async Task<IActionResult> Cadastrar (Produto produto)
        {
            if(await VerDisp(produto.CodProduto, null) == false)
                return BadRequest("Produto já cadastrado.");

            await _context.AddAsync(produto);
            await _context.SaveChangesAsync();
            
            return Created("", produto);
            
        }

        [HttpGet]
        [Route("buscar_cod")]
        public async Task<ActionResult<Produto>> BuscarCod(string cod)
        {
            if(_context.Produto is null)
                return NotFound();
            var produto = await _context.Produto.FirstOrDefaultAsync(p => p.CodProduto == cod);
            if(produto is null)
                return NotFound();
            return produto;
        }


        //Este método deve funcionar tanto ao cadastrar como ao alterar um produto, 
        [HttpGet]
        [Route("ver_disp")]
        public async Task<bool> VerDisp(string cod, int? id)
        {
            if (_context.Produto is null)
                return false;
            

            if (id == null)
                return !(await _context.Produto.AnyAsync(p => p.CodProduto == cod));
            else
            {
                return !(await _context.Produto
                    .Where(p => p.CodProduto == cod && p.Id != id)
                    .AnyAsync());
            }
        }


        [HttpGet]
        [Route("buscar_nome")]
        public async Task<ActionResult<List<Produto>>> BuscarNome(string nome)
        {
            if(_context.Produto is null)
                return NotFound();
            var produtos = await _context.Produto.Where(p => p.Nome.Contains(nome)).ToListAsync();
            if(produtos.Count == 0)
                return NotFound();
            return produtos;
        }

        [HttpPut]
        [Route("alterar")]
        public async Task<IActionResult> AlterarProduto(Produto produto)
        {
            if(await VerDisp(produto.CodProduto, produto.Id))
                return BadRequest("Código de produto indisponível.");
            
            _context.Produto.Update(produto);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete]
        [Route("deletar")]
        public async Task<ActionResult> ExcluirCod(string cod)
        {
            var produtoExistente = await _context.Produto.FirstOrDefaultAsync(p => p.CodProduto == cod);
            if (produtoExistente == null) 
                return NotFound();
            _context.Produto.Remove(produtoExistente);
            await _context.SaveChangesAsync();
            return NoContent();
        
        }

    }
}