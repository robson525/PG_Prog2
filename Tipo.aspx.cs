using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Tipo : System.Web.UI.Page
{

    private SigosWebEntities entity = new SigosWebEntities();

    protected void Page_Load(object sender, EventArgs e)
    {

        if (!IsPostBack)
        {
            this.carregarTipos();
        }

    }

    private void carregarTipos()
    {
        

        var query = from tipos in entity.TipoOcorrencia select tipos;

        gridTipos.DataSource = query.ToList();
        gridTipos.DataBind();
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
}