using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NunesSport_Back_End.src.Models {
    public class Produto
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string? Nome { get; set; }
        public string? CodProduto { get; set; }
        public string? DescProduto { get; set; }
        public float ValorProduto { get; set; }

        public Produto() { }

    }
}