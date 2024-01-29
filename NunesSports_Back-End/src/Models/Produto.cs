namespace NunesSport_Back_End.src.Models {
    public class Produto
    {
        public int Id { get; set; }
        public string? Nome { get; set; }
        public string? CodProduto { get; set; }
        public string? DescProduto { get; set; }
        public float ValorProduto { get; set; }

        public Produto() { }

    }
}