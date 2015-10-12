using System;
using System.Collections.Generic;
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
            this.carregaOcorrencias();
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
}