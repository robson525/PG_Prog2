package util;

public class ScriptsSQL {

    public static String getCreateUnidade(){

        StringBuilder sqlBuilder = new StringBuilder();
        sqlBuilder.append("CREATE TABLE IF NOT EXISTS UNIDADE ( ");
        sqlBuilder.append("_id INTEGER PRIMARY KEY NOT NULL, ");
        sqlBuilder.append("NOME VARCHAR VARCHAR (100) NOT NULL ");
        sqlBuilder.append(");");

        return sqlBuilder.toString();
    }

    public static String getCreateSetor(){

        StringBuilder sqlBuilder = new StringBuilder();
        sqlBuilder.append("CREATE TABLE IF NOT EXISTS SETOR ( ");
        sqlBuilder.append("_id INTEGER PRIMARY KEY NOT NULL, ");
        sqlBuilder.append("NOME VARCHAR VARCHAR (100) NOT NULL, ");
        sqlBuilder.append("UNIDADE INTEGER REFERENCES UNIDADE (_id) ON DELETE SET NULL ON UPDATE CASCADE ");
        sqlBuilder.append(");");

        return sqlBuilder.toString();
    }


    public static String getCreateUsuario(){
        StringBuilder sqlBuilder = new StringBuilder();
        sqlBuilder.append("CREATE TABLE IF NOT EXISTS USUARIO ( ");
        sqlBuilder.append("_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ");
        sqlBuilder.append("NOME VARCHAR (200) NOT NULL, ");
        sqlBuilder.append("TELEFONE VARCHAR (14) NOT NULL, ");
        sqlBuilder.append("EMAIL VARCHAR (100) NOT NULL, ");
        sqlBuilder.append("SETOR INTEGER REFERENCES SETOR (_id) ON DELETE SET NULL ON UPDATE CASCADE ");
        sqlBuilder.append(");");

        return sqlBuilder.toString();
    }

    public static String getCreateEstudante(){
        StringBuilder sqlBuilder = new StringBuilder();
        sqlBuilder.append("CREATE TABLE IF NOT EXISTS ESTUDANTE ( ");
        sqlBuilder.append("_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ");
        sqlBuilder.append("MATRICULA VARCHAR (20) NOT NULL, ");
        sqlBuilder.append("USUARIO INTEGER REFERENCES USUARIO (_id) ON DELETE CASCADE ON UPDATE CASCADE ");
        sqlBuilder.append(");");

        return sqlBuilder.toString();
    }

    public static String getCreateFuncionario(){
        StringBuilder sqlBuilder = new StringBuilder();
        sqlBuilder.append("CREATE TABLE IF NOT EXISTS FUNCIONARIO ( ");
        sqlBuilder.append("_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ");
        sqlBuilder.append("SIAPE VARCHAR (20) NOT NULL, ");
        sqlBuilder.append("USUARIO INTEGER REFERENCES USUARIO (_id) ON DELETE CASCADE ON UPDATE CASCADE ");
        sqlBuilder.append(");");

        return sqlBuilder.toString();
    }

    public static String getCreateOutro(){
        StringBuilder sqlBuilder = new StringBuilder();
        sqlBuilder.append("CREATE TABLE IF NOT EXISTS OUTRO ( ");
        sqlBuilder.append("_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ");
        sqlBuilder.append("CPF VARCHAR (11) NOT NULL, ");
        sqlBuilder.append("USUARIO INTEGER REFERENCES USUARIO (_id) ON DELETE CASCADE ON UPDATE CASCADE ");
        sqlBuilder.append(");");

        return sqlBuilder.toString();
    }


    public static String getCreateTipoOcorrencia(){
        StringBuilder sqlBuilder = new StringBuilder();
        sqlBuilder.append("CREATE TABLE IF NOT EXISTS OCORRENCIA_TIPO ( ");
        sqlBuilder.append("_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ");
        sqlBuilder.append("NOME VARCHAR (50) NOT NULL ");
        sqlBuilder.append(");");

        return sqlBuilder.toString();
    }

    public  static String getCreateOcorrencia(){
        StringBuilder sqlBuilder = new StringBuilder();
        sqlBuilder.append("CREATE TABLE IF NOT EXISTS OCORRENCIA ( ");
        sqlBuilder.append("_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ");
        sqlBuilder.append("DESCRICAO TEXT NOT NULL, ");
        sqlBuilder.append("LOCAL VARCHAR(200), ");
        sqlBuilder.append("PAPEL INTEGER NOT NULL, ");
        sqlBuilder.append("TIPO_OCORRENCIA INTEGER REFERENCES OCORRENCIA_TIPO(_id)ON DELETE SET NULL ON UPDATE CASCADE NOT NULL, ");
        sqlBuilder.append("SETOR INTEGER REFERENCES SETOR(_id)ON DELETE SET NULL ON UPDATE CASCADE NOT NULL, ");
        sqlBuilder.append("USUARIO INTEGER REFERENCES USUARIO(_id)ON DELETE SET NULL ON UPDATE CASCADE ");
        sqlBuilder.append(");");

        return sqlBuilder.toString();

    }

    public static String getCreateEnvio(){
        StringBuilder sqlBuilder = new StringBuilder();
        sqlBuilder.append("CREATE TABLE IF NOT EXISTS ENVIO ( ");
        sqlBuilder.append("_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ");
        sqlBuilder.append("DATA DATETIME DEFAULT CURRENT_TIMESTAMP , ");
        sqlBuilder.append("STATUS INTEGER NOT NULL, ");
        sqlBuilder.append("OCORRENCIA INTEGER REFERENCES OCORRENCIA (_id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL ");
        sqlBuilder.append(");");

        return sqlBuilder.toString();
    }


    public static String[] getDefaultUnidade(){
        String[] sqlBuilder = {
        "INSERT INTO UNIDADE (_id, NOME) VALUES (1, 'Guama');",
        "INSERT INTO UNIDADE (_id, NOME) VALUES (2, 'Altamira');"};

        return sqlBuilder;
    }

    public static String[] getDefaultSetor(){
        String[] sqlBuilder = {
        "INSERT INTO SETOR (_id, NOME, UNIDADE) VALUES (1, 'ICB', 1);",
        "INSERT INTO SETOR (_id, NOME, UNIDADE) VALUES (2, 'ITEC', 1);",
        "INSERT INTO SETOR (_id, NOME, UNIDADE) VALUES (3, 'Ginasio', 1);",
        "INSERT INTO SETOR (_id, NOME, UNIDADE) VALUES (4, 'Biblioteca', 1);",
        "INSERT INTO SETOR (_id, NOME, UNIDADE) VALUES (5, 'Biblioteca', 2);",
        "INSERT INTO SETOR (_id, NOME, UNIDADE) VALUES (6, 'Bloco A', 2);"};

        return sqlBuilder;
    }

    public static String[] getDefaultTipoOcorrencia(){
        String[] sqlBuilder = {
        "INSERT INTO OCORRENCIA_TIPO (_id, NOME) VALUES (1, 'Assalto');",
        "INSERT INTO OCORRENCIA_TIPO (_id, NOME) VALUES (2, 'Furto');",
        "INSERT INTO OCORRENCIA_TIPO (_id, NOME) VALUES (3, 'Depredação');",
        "INSERT INTO OCORRENCIA_TIPO (_id, NOME) VALUES (4, 'Invasão');",
        "INSERT INTO OCORRENCIA_TIPO (_id, NOME) VALUES (5, 'Pessoa Estranha');"
        };

        return sqlBuilder;
    }

}

