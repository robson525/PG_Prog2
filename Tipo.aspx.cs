using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Tipo : System.Web.UI.Page
{

    private SigosWebEntities entity = new SigosWebEntities();

    protected void Page_Load(object sender, EventArgs e)
    {
        ((LinkButton)Master.FindControl("ConfirmButtonYes")).Command += new CommandEventHandler(Delete);

        if (!IsPostBack)
        {
            this.carregarTiposSem();
        }

    }

    private void carregarTipos()
    {
        var query = from tipos in entity.TipoOcorrencia select tipos;

        gridTipos.DataSource = query.ToList();
        gridTipos.DataBind();
    }

    private void carregarTiposSem()
    {
        string stringConexao = @"Data Source=ROBSON-NOTEBOOK\SQLEXPRESS; Initial Catalog=SigosWeb; integrated security=True;MultipleActiveResultSets=True;";
        SqlConnection conexao = new SqlConnection(stringConexao);
        SqlCommand comando = new SqlCommand("SELECT * FROM TipoOcorrencia", conexao);
        try
        {
            conexao.Open();
            comando.ExecuteNonQuery();
            SqlDataReader leitor = comando.ExecuteReader();

            List<TipoOcorrencia> lista = new List<TipoOcorrencia>();

            while (leitor.Read())
            {
                TipoOcorrencia tipo = new TipoOcorrencia();
                tipo.id = int.Parse(leitor["id"].ToString());
                tipo.nome = leitor["nome"].ToString();
                lista.Add(tipo); 
            }

            gridTipos.DataSource = lista;
            gridTipos.DataBind();
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


    protected void btSave_Click(object sender, EventArgs e)
    {
        TipoOcorrencia tipo = new TipoOcorrencia();
        tipo.nome = txtNome.Text;

        int id = 0;
        if (Int32.TryParse(tipoID.Text, out id))
        {
            tipo.id = id;
        }

        try
        {
            this.entity.TipoOcorrencia.Add(tipo);
            this.entity.SaveChanges();

            FuncoesGerais.EscreveMensagemAlertas(this, FuncoesGerais.TiposMensagem.success, "Tipo de Ocorrência Cadastrado com Sucesso");
        }
        catch (Exception ex)
        {
            FuncoesGerais.EscreveMensagemAlertas(this, FuncoesGerais.TiposMensagem.error, ex.Message);
        }

        this.carregarTipos();

    }


    protected void Delete(object sender, CommandEventArgs e)
    {
        string atributos = ((TextBox)Master.FindControl("ConfirmParametros")).Text;
        string[] variaveis = atributos.Split(',');
        int id = Int32.Parse(variaveis[0]);

        try
        {

            TipoOcorrencia tipoOcorrencia = (from tipo in entity.TipoOcorrencia where tipo.id == id select tipo).FirstOrDefault();
            if (tipoOcorrencia != null)
            {
                this.entity.TipoOcorrencia.Remove(tipoOcorrencia);
                this.entity.SaveChanges();

                FuncoesGerais.EscreveMensagemAlertas(this, FuncoesGerais.TiposMensagem.success, "Tipo de Ocorrência Deletada com Sucesso");
            }


        }
        catch (Exception ex)
        {
            FuncoesGerais.EscreveMensagemAlertas(this, FuncoesGerais.TiposMensagem.error, ex.Message);
        }

        this.carregarTipos();

    }

}