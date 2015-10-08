using System;
using System.Collections.Generic;
using System.IO;
using System.Security.Claims;
using System.Security.Principal;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;




public partial class SiteMaster : MasterPage
{
    public LinkButton btModalYes
    {
        get
        {
            return ConfirmButtonYes;
        }
        set
        {
            ConfirmButtonYes = value;
        }
    }

    public TextBox CParametros
    {
        get
        {

            return ConfirmParametros;
        }
        set
        {
            ConfirmParametros = value;
        }
    }

    protected void Page_Load(object sender, EventArgs e)
    {
        
    }
}