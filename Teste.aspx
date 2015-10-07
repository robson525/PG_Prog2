<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.master" CodeFile="Teste.aspx.cs" Inherits="Teste" %>

<%@ MasterType VirtualPath="~/Site.master" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="Server">

    <div class="container-fluid">

        <div class="page-header">
            <h4>Estudantes</h4>
        </div>


        <asp:GridView ID="gridEstudantes" ClientIDMode="Static" runat="server" AutoGenerateColumns="true" CellPadding="3" CssClass="table table-condensed grid-view-padrao"
            ForeColor="#333333" GridLines="None" AllowPaging="True" AllowSorting="True" 
            PageSize="50" >


            <HeaderStyle CssClass="grid-head" ForeColor="White" />
            <RowStyle CssClass="grid-row" />
            <AlternatingRowStyle CssClass="grid-row-alt" />
            <PagerStyle CssClass="grid-row-footer" ForeColor="White" />
            <FooterStyle CssClass="grid-head" ForeColor="White" />

        </asp:GridView>


    </div>

</asp:Content>
