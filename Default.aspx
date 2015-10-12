<%@ Page Title="Principal" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

    <div class="container-fluid">

        <div class="page-header">
            <h4>List de Ocorrências</h4>
        </div>

    </div>

    <asp:GridView ID="gridOcorrencias" ClientIDMode="Static" runat="server" AutoGenerateColumns="true" CellPadding="3" CssClass="table table-condensed grid-view-padrao" ForeColor="#333333" GridLines="None" AllowPaging="True" AllowSorting="True" PageSize="50">
        
        <HeaderStyle CssClass="grid-head" ForeColor="White" />
        <RowStyle CssClass="grid-row" />
        <AlternatingRowStyle CssClass="grid-row-alt" />
        <PagerStyle CssClass="grid-row-footer" ForeColor="White" />
        <FooterStyle CssClass="grid-head" ForeColor="White" />

    </asp:GridView>

</asp:Content>
