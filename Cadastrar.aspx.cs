using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Cadastrar : System.Web.UI.Page
{
    private SigosWebEntities entity = new SigosWebEntities();

    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            this.carregarDropDowns();
        }
    }

    private void carregarDropDowns()
    {
        var tipoOcorrencias = from tipo in this.entity.TipoOcorrencia select tipo;

        ddlTipoOcorrencia.DataSource = tipoOcorrencias.ToList();
        ddlTipoOcorrencia.DataValueField = "id";
        ddlTipoOcorrencia.DataTextField = "nome";
        ddlTipoOcorrencia.DataBind();
        ddlTipoOcorrencia.Items.Insert(0, new ListItem("Selecione", ""));

        var papeis = from papel in this.entity.Papel select papel;

        ddlPapel.DataSource = papeis.ToList();
        ddlPapel.DataValueField = "id";
        ddlPapel.DataTextField = "nome";
        ddlPapel.DataBind();
        ddlPapel.Items.Insert(0, new ListItem("Selecione", ""));

        var unidades = from unidade in this.entity.Unidade select unidade;

        ddlUnidade.DataSource = unidades.ToList();
        ddlUnidade.DataValueField = "id";
        ddlUnidade.DataTextField = "nome";
        ddlUnidade.DataBind();
        ddlUnidade.Items.Insert(0, new ListItem("Selecione", ""));

    }

    protected void ddlUnidade_SelectedIndexChanged(object sender, EventArgs e)
    {
        int uindadeID = 0;
        int.TryParse(ddlUnidade.SelectedValue, out uindadeID);

        if (uindadeID > 0)
        {
            var setores = from setor in this.entity.Setor where setor.unidade == uindadeID select setor;
            ddlSetor.DataSource = setores.ToList();
            ddlSetor.DataValueField = "id";
            ddlSetor.DataTextField = "nome";
            ddlSetor.DataBind();
            ddlSetor.Items.Insert(0, new ListItem("Selecione", ""));
        }
    }


    protected void btSave_Click(object sender, EventArgs e)
    {
        int TipoOcorrenciaID = 0;
        int.TryParse(ddlTipoOcorrencia.SelectedValue, out TipoOcorrenciaID);

        int PapelID = 0;
        int.TryParse(ddlPapel.SelectedValue, out PapelID);

        int SetorID = 0;
        int.TryParse(ddlSetor.SelectedValue, out SetorID);

        Usuario usuairo = new Usuario();
        if (ddlTipoUsuario.Text == "1")
        {
            Estudante estudante = new Estudante();
            estudante.matricula = txtMatricula.Text;
            usuairo.Estudante = estudante;
        }
        else if (ddlTipoUsuario.Text == "2")
        {
            Funcionario funcionario = new Funcionario();
            funcionario.siape = txtMatricula.Text;
            usuairo.Funcionario = funcionario;
        }
        else
        {
            Outro outro = new Outro();
            outro.cpf = txtMatricula.Text;
            usuairo.Outro = outro;
        }
        

        usuairo.nome = txtNome.Text;
        usuairo.email = txtEmail.Text;
        usuairo.telefone = txtFone.Text;

        Ocorrencia ocorrencia = new Ocorrencia();
        ocorrencia.Usuario1 = usuairo;
        ocorrencia.tipoOcorrencia = TipoOcorrenciaID;
        ocorrencia.papel = PapelID;
        ocorrencia.setor = SetorID;
        ocorrencia.local = txtLocal.Text;
        ocorrencia.descricao = txtDescricao.Text;

        try
        {
            this.entity.Ocorrencia.Add(ocorrencia);
            this.entity.SaveChanges();
            FuncoesGerais.EscreveMensagemAlertas(this, FuncoesGerais.TiposMensagem.success, "Ocorrência Salva com Sucesso");
        }
        catch (Exception ex){
            FuncoesGerais.EscreveMensagemAlertas(this, FuncoesGerais.TiposMensagem.error, ex.Message);
        }

    }
}