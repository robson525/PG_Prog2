using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Hosting;
using System.Web.UI;
using System.IO;
using System.Text.RegularExpressions;

public static class FuncoesGerais
{

    public enum TiposMensagem
    {
        info,
        error,
        success,
        block
    }

    public static void EscreveMensagemAlertas(Page p, TiposMensagem CssClass, string sMensagem)
    {
        String csName = "ButtonClickScript" + DateTime.Now.Ticks.ToString();
        ClientScriptManager cs = p.ClientScript;
        if (!cs.IsClientScriptBlockRegistered(p.GetType(), csName))
        {
            StringBuilder csText = new StringBuilder();
            csText.Append("<script type=\"text/javascript\">");
            csText.Append("$(document).ready(function(){alertas('" + CssClass.ToString() + "', \"" + sMensagem.Replace("\r\n", "<br />").Replace("\"", "'") + "\");}); ");
            csText.Append("</script>");
            cs.RegisterClientScriptBlock(p.GetType(), csName, csText.ToString());
        }
    }

    public static bool VerificaLogado(object Session)
    {
        if (Session != null)
        {
            if (bool.Parse(Session.ToString()))
                return true;
            else
                return false;
        }
        else
        {
            return false;
        }
    }

   

    public static string[] Cores()
    {
        string[] cores = { "#8F1AC1", "#6907E0", "#BE89D7", "#058DC7", "#B94A48", "#468847", "#C1F155", "#2B5543", "#4391C7", "#95A6C0", "#627498", "#86AF0E", "#1377DC", "#A6F5A1", "#FD1C18", "#10F364", "#F293FD", "#D86685", "#EF6D18", "#AFC9E1", "#A664B3", "#76CE64", "#81695C", "#DA0FE1", "#0DBB20", "#62DFF5", "#DF7F4D", "#9332FD", "#D545E0", "#A7D3EB", "#7F126C", "#EF8BBF", "#E82324", "#B846DC", "#CDB935", "#B0C343", "#595C53", "#13A824", "#21A4EC", "#49BC78", "#7B6823", "#AD9D1F", "#162D25", "#8B93D6", "#ED17CF", "#356AF5", "#81D890", "#9B4FA7", "#A0221C", "#E3F4AA", "#F87F68", "#1BC52D", "#62AEAA", "#34ADA4", "#554682", "#DF50DF", "#C2A32C", "#864DB3", "#3D207A", "#50274C", "#E27206", "#7A8821", "#EF4B0B", "#BB0C08", "#91E0F6", "#3BC983", "#860E91", "#8B4AE9", "#C7ED89", "#B1B154", "#2D52BB", "#FFCFB7", "#8550B5", "#A8D784", "#5CFE62", "#41CFF9", "#999CBB", "#1AD0DD", "#89B694", "#4BFE67", "#583750", "#442FA6", "#F310DF", "#F15134", "#AF5481", "#634D3F", "#8CDD14", "#B37580", "#63005A", "#EE6855", "#EE2015", "#D30E9F", "#D687A9", "#D17D9F", "#674A71", "#00E001", "#BE5212", "#5B211B", "#F9B2DE", "#B14E4C", "#AF5C63", "#F68DA6", "#D3621C", "#EE70C7", "#B6A1EF", "#F8AFB0", "#967477", "#B9D725", "#D7AF41", "#137688", "#45B423", "#A7D24F", "#FC971D", "#F12212", "#F7EFFA", "#9E4260", "#877741", "#FDF9D6", "#0BB786", "#2E93B7", "#AEEC6E", "#D29910", "#284A8F", "#D98533", "#C3913D", "#5A441B", "#29480D", "#B3D314", "#418D13", "#5C1E60", "#837DE6", "#3E7BA0", "#211DFD", "#D86847", "#9CA202", "#61A9A9", "#70CD88", "#04A018", "#3AAF44", "#B6A4D0", "#CCD8C6", "#D305ED", "#DBC63E", "#4F89D2", "#A8B432", "#464DC6", "#D67780", "#E56595", "#D98DA4", "#C9080F", "#7968BF", "#C0583B", "#4F6995", "#CB1F27", "#0261DE", "#DCC352", "#CE4317", "#F9DCE8", "#2ADF8A", "#5C5DD4", "#CF67A2", "#E2A162", "#784A12", "#7B90E0", "#8FF8A1", "#073883", "#86B451", "#242ED6", "#548010", "#964650", "#2D74D7", "#82D729", "#C34A91", "#5512B5", "#61BAEF", "#DBE67F", "#F6D2D0", "#D8C0BC", "#30D101", "#7D4377", "#83CC99", "#43E277", "#DA456F", "#788502", "#E2B5A0", "#C325AA", "#EF120A", "#55FED5", "#D60669", "#BFDEAF", "#936691", "#76F09F", "#D9C08C", "#DE516F", "#E73D2C", "#EA3763", "#5ABBDB", "#60355D", "#BF912F", "#A17BAE", "#BF9973", "#B248AA", "#90E585", "#434753", "#9B9337", "#F69195", "#FD0DA8", "#FA56DE", "#696437", "#267B5D", "#E5F080", "#F58259", "#C90BE7", "#AD9C11", "#D8913A", "#8B852B", "#085BF2", "#FFC50E", "#98DB3F", "#CCD2F6", "#182678", "#30B57B", "#4E286B", "#94A15F", "#02DFBF", "#B68437", "#A9169B", "#E4F921", "#6DD587", "#77838B", "#812AA3", "#969D73", "#192F8C", "#8F5551", "#BDAA02", "#D183EE", "#B2FCF0", "#96FE1B", "#DCF1CA", "#EC2409", "#C61800", "#F4BB2A", "#EC9A9D", "#AF8B0B", "#D9EE2D", "#9DE436", "#ADE4B6", "#2C247B", "#05C035", "#5BB801", "#E1DB70", "#5AF6CC", "#C75A1C", "#F2BE38", "#895536", "#8EE3F7", "#64203E", "#FC4424", "#406793", "#E50EFE", "#4D7AF9", "#181487", "#8C8156", "#F1E0AA", "#A550B9", "#4F530C", "#DC52CD", "#39B696", "#EFF20E", "#070D4B", "#D88839", "#715DD6", "#22D344", "#ACB734", "#06BAF5", "#236B4C", "#441ADD", "#9E9D5F", "#BAB331", "#64FB87", "#089F81", "#7CF220", "#DF38EC", "#121D86", "#95A819", "#2633D6", "#CF4355", "#267152", "#06001A", "#2EC60B", "#6D63AF", "#B6B8CB", "#569687", "#F7E2CA", "#9EA910", "#AE0378", "#6839D3", "#FAB9F1", "#0A3A51", "#8A9B20", "#C490ED", "#6E31B6" };
        return cores;
    }

    public static string[] Cores(int quantidade)
    {
        string[] cores = FuncoesGerais.Cores().Skip(0).Take(quantidade).ToArray();
        return cores;
    }

    public static string ShowBytes(long byteCount)
    {
        string[] suf = { " B", " KB", " MB", " GB", " TB", " PB", " EB" }; //Longs run out around EB
        if (byteCount == 0)
            return "0" + suf[0];
        long bytes = Math.Abs(byteCount);
        int place = Convert.ToInt32(Math.Floor(Math.Log(bytes, 1024)));
        double num = Math.Round(bytes / Math.Pow(1024, place), 1);
        return (Math.Sign(byteCount) * num).ToString() + suf[place];
    }

    public static string ShowBytes(double byteCount)
    {
        string[] suf = { " B", " KB", " MB", " GB", " TB", " PB", " EB" }; //Longs run out around EB
        if (byteCount == 0)
            return "0" + suf[0];
        double bytes = Math.Abs(byteCount);
        int place = Convert.ToInt32(Math.Floor(Math.Log(bytes, 1024)));
        double num = Math.Round(bytes / Math.Pow(1024, place), 1);
        return (Math.Sign(byteCount) * num).ToString() + suf[place];
    }

    public static string ShowBytes(decimal byteCount)
    {
        return ShowBytes(double.Parse(byteCount.ToString()));
    }

    public static void teste()
    {

    }
}
