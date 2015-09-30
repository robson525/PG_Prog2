package util;


public class DataBase  {

    public DataBase(){
    }

    public static void main(String[] args) {
       

         System.out.println(ScriptsSQL.getCreateUnidade());
         System.out.println(ScriptsSQL.getCreateSetor());
         System.out.println(ScriptsSQL.getCreateUsuario());
         System.out.println(ScriptsSQL.getCreateEstudante());
         System.out.println(ScriptsSQL.getCreateFuncionario());
         System.out.println(ScriptsSQL.getCreateOutro());
         System.out.println(ScriptsSQL.getCreateTipoOcorrencia());
         System.out.println(ScriptsSQL.getCreateOcorrencia());
         System.out.println(ScriptsSQL.getCreateEnvio());

        /*********************************************/
        String[] Unidade = ScriptsSQL.getDefaultUnidade();
        for(int i=0; i < Unidade.length; i++){
             System.out.println(Unidade[i]);
        }

        String[] Setor = ScriptsSQL.getDefaultSetor();
        for(int i=0; i < Setor.length; i++){
             System.out.println(Setor[i]);
        }

        String[] TipoOcorrencia = ScriptsSQL.getDefaultTipoOcorrencia();
        for(int i=0; i < TipoOcorrencia.length; i++){
             System.out.println(TipoOcorrencia[i]);
        }

    }

  
}
