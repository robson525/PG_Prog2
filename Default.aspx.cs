using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class _Default : Page
{

    private SigosWebEntities entity = new SigosWebEntities();

    protected void Page_Load(object sender, EventArgs e)
    {
        if(!IsPostBack)
        {
            this.carregaOcorrencias_Sem();
        }

    }


    private void carregaOcorrencias()
    {
        var ocorrencias = from ocorrencia in this.entity.Ocorrencia select new { 
                                                                                Unidade = ocorrencia.Setor1.Unidade1.nome,
                                                                                Setor = ocorrencia.Setor1.nome,
                                                                                Local = ocorrencia.local,
                                                                                Tipo = ocorrencia.TipoOcorrencia1.nome,
                                                                                Usuairo = ocorrencia.Usuario1.nome
                                                                            };

        gridOcorrencias.DataSource = ocorrencias.ToList();
        gridOcorrencias.DataBind();
    }


    private void carregaOcorrencias_Sem()
    {
        string stringConexao = @"Data Source=ROBSON-NOTEBOOK\SQLEXPRESS; Initial Catalog=SigosWeb; integrated security=True;MultipleActiveResultSets=True;";
        SqlConnection conexao = new SqlConnection(stringConexao);
        String sql = "SELECT o.descricao, o.local, p.nome as papel, t.nome as tipoOcorrencia, s.nome as setor, u.nome as unidade, us.nome as usuario " + 
                        "FROM Ocorrencia o " +
                        "JOIN Papel p ON p.id = o.papel " +
                        "JOIN TipoOcorrencia t ON t.id = o.tipoOcorrencia " +
                        "JOIN Setor s ON s.id = o.setor " +
                        "JOIN Unidade u ON u.id = s.unidade " +
                        "JOIN Usuario us ON us.id = o.usuario ";

        SqlCommand comando = new SqlCommand(sql, conexao);
        try
        {
            conexao.Open();
            SqlDataReader leitor = comando.ExecuteReader();

            List<Object> lista = new List<Object>();

            while (leitor.Read())
            {
                var aux = new {
                    Unidade = leitor["unidade"].ToString(),
                    Setor = leitor["setor"].ToString(),
                    Local = leitor["local"].ToString(),
                    Tipo = leitor["tipoOcorrencia"].ToString(),
                    Usuairo = leitor["usuario"].ToString(),
                };

                lista.Add(aux);
            }

            gridOcorrencias.DataSource = lista;
            gridOcorrencias.DataBind();
        }
        catch (Exception ex)
        {
            FuncoesGerais.EscreveMensagemAlertas(this, FuncoesGerais.TiposMensagem.error, ex.Message);
        }
        finally
        {
            conexao.Close();
        }

    }
}