<script  runat="server">
    Sub Page_Load()
        Dim dr As Data.SqlClient.SqlDataReader = Nothing
        Dim conn As New Data.SqlClient.SqlConnection(ConfigurationManager.ConnectionStrings("reports").ConnectionString)
        Dim resp As String = ""
        Try
            Dim comm As New Data.SqlClient.SqlCommand("LW_SMS.[dbo].[GetFile] @USERNAME = '" + Request("usr") + "', @TOKEN = '" + Request("token") + "', @DB = '" + Request("db") + "', @F = '" + Request("f") + "'", conn)
            'Dim comm As New Data.SqlClient.SqlCommand("LW_SMS.[dbo].[GetFile] @USERNAME = '" + usr + "', @TOKEN = '" + token + "', @DB = '" + db + "', @F = '" + f + "'", conn)
            conn.Open()
            dr = comm.ExecuteReader
            'resp = comm.CommandText
            
            If dr.HasRows Then
                If dr.Read Then
                    'resp = CStr(dr!DATA_FILE)
                    Dim strBase64 = Convert.ToBase64String(CType(dr!BIN, Byte()))
                    
                    resp = (dr!HTML_ZACATEK) + Microsoft.VisualBasic.Left(strBase64, 200) + CStr(dr!HTML_KONEC)
                End If
            End If
        Catch ex As Exception
            Response.Write(ex.Message)
        Finally
            If Not dr Is Nothing Then
                If Not dr.IsClosed Then
                    dr.Close()
                End If
                dr = Nothing
            End If
            If conn.State = Data.ConnectionState.Open Then
                conn.Close()
            End If
        End Try
	'Response.Write("OK")
	'Response.Write(resp.length)
	if resp.Length > 30000000 then
		Response.Write("Too long")
'		dim str as string = microsoft.visualbasic.left(resp, 100000)
'		while str.length > 0
'			Response.Write(str)
'			resp = replace(resp, str, "")
'			str = microsoft.visualbasic.left(resp, 100000)
'		end while
	else
		Response.Write(resp)
	end if
    End Sub
</script>

