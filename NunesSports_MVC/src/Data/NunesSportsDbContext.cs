using Microsoft.EntityFrameworkCore;
using NunesSport_Back_End.src.Models;

namespace NunesSport_Back_End.src.Data
{
    public class NunesSportsDbContext : DbContext
    {
        public DbSet<Produto> Produto { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            string connectionString = "Data Source=NunesSports.db;";

            optionsBuilder.UseSqlite(connectionString);
        }
    }
    
}
