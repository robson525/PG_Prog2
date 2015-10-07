using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Teste : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        SigosWebEntities entity = new SigosWebEntities();

        var query = from tipos in entity.TipoOcorrencia select tipos.nome;

        gridEstudantes.DataSource = query.ToList();
        gridEstudantes.DataBind();
        

    }
}