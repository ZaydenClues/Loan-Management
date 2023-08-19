using Microsoft.EntityFrameworkCore;
using WebApplication1.Model;
using WebApplication1.Services.EmployeeServices;

namespace WebApplication1
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();


            //Dependency Injection DbContext Class
            builder.Services.AddDbContext<APIDbContext>(options =>
            options.UseSqlServer(@"server=WINDOWS-BVQNF6J;database=loandata;trusted_connection=true;TrustServerCertificate=True;"));
           
            builder.Services.AddScoped<IEmployeeService, EmployeeService>();
            
            
            builder.Services.AddCors(o => o.AddPolicy("CORS", builder =>
            {
                builder.AllowAnyHeader()
                .AllowAnyOrigin()
                .AllowAnyMethod();
            }));
            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();
            app.UseCors("CORS");
            app.Run();
        }
    }
}