<%@ WebService Language="VBScript" Class="CW_WS" %>
Imports System
Imports System.Xml
Imports System.Collections.Generic
Imports System.Web
Imports System.Web.Services
Imports System.Web.Script
Imports System.Web.Script.Services
Imports System.Web.Script.Serialization
Imports System.Web.Services.Protocols
Imports System.Runtime.Serialization.Json
imports System.Web.Script.Services.ScriptService 

<WebService([Namespace]:="http://oje.balstrom/"), _
System.Web.Script.Services.ScriptService()> _
Public Class CW_WS :Inherits WebService

<WebMethod()> _
<ScriptMethod(ResponseFormat := ResponseFormat.Json)> _
Public function LKMB_login_portal(byval usr as string, byval pwd as string) as string
    Dim dt As New System.Data.DataTable()
    Using con As New Data.SqlClient.SqlConnection(ConfigurationManager.ConnectionStrings("lkmb").ConnectionString)
    Using cmd As New Data.SqlClient.SqlCommand("dbo.LKMB_login_portal @usr = '" + usr + "', @PWD = '" + pwd + "'", con)
    con.Open()
    Dim da As New Data.SqlClient.SqlDataAdapter(cmd)
    da.Fill(dt)

    'convert the filled DT into JSON
    Dim serializer As New System.Web.Script.Serialization.JavaScriptSerializer()
    Dim rows As New List(Of Dictionary(Of String, Object))()
    Dim row As Dictionary(Of String, Object)
    For Each dr As System.Data.DataRow In dt.Rows
        row = New Dictionary(Of String, Object)()
        For Each col As System.Data.DataColumn In dt.Columns
            row.Add(col.ColumnName, dr(col))
        Next
        rows.Add(row)
    Next
    Return serializer.Serialize(rows)
    End Using
    End Using
end function

<WebMethod()> _
<ScriptMethod(ResponseFormat := ResponseFormat.Json)> _
Public function LKMB_logout_portal(byval usr as string, byval token as string) as string
    Dim dt As New System.Data.DataTable()
    Using con As New Data.SqlClient.SqlConnection(ConfigurationManager.ConnectionStrings("lkmb").ConnectionString)
    Using cmd As New Data.SqlClient.SqlCommand("dbo.LKMB_logout_portal @usr = '" + usr + "', @TOKEN = '" + token + "'", con)
    con.Open()
    Dim da As New Data.SqlClient.SqlDataAdapter(cmd)
    da.Fill(dt)

    'convert the filled DT into JSON
    Dim serializer As New System.Web.Script.Serialization.JavaScriptSerializer()
    Dim rows As New List(Of Dictionary(Of String, Object))()
    Dim row As Dictionary(Of String, Object)
    For Each dr As System.Data.DataRow In dt.Rows
        row = New Dictionary(Of String, Object)()
        For Each col As System.Data.DataColumn In dt.Columns
            row.Add(col.ColumnName, dr(col))
        Next
        rows.Add(row)
    Next
    Return serializer.Serialize(rows)
    End Using
    End Using
end function

<WebMethod()> _
<ScriptMethod(ResponseFormat := ResponseFormat.Json)> _
Public function LKMB_pilot_update(byval usr as string, byval token as string, byval insertRecord as string, updatePWD as string, PWD as string, FIRSTNAME as string, SURNAME as string _
        , [EMAIL] as string, PHONE as string, PP_NUMBER as string, PP_VALID_TO as string, PS_NUMBER as string, PS_VALID_TO as string, MEDICAL_VALID_TO as string, QUALIFICATION as string, DEFAULT_MINUTE_PRICE as string, AIRCRAFT_CATEGORY as string) as string
    Dim dt As New System.Data.DataTable()
    Using con As New Data.SqlClient.SqlConnection(ConfigurationManager.ConnectionStrings("lkmb").ConnectionString)
    Using cmd As New Data.SqlClient.SqlCommand("dbo.[LKMB_pilot_update] @USR = '" + usr + "', @TOKEN = '" + token + "', @insert = " + insertRecord + ", @updatePWD = " +  updatePWD + _
        ", @PWD = '" + PWD + "', @FIRSTNAME = '" + FIRSTNAME + "', @SURNAME = '" + SURNAME + "', @EMAIL = '" + [EMAIL] + "', @PHONE = '" + PHONE + _
        "', @PP_NUMBER = '" + PP_NUMBER + "', @PP_VALID_TO = '" + PP_VALID_TO + "',  @PS_NUMBER = '" + PS_NUMBER + "', @PS_VALID_TO = '" + PS_VALID_TO + "', @MEDICAL_VALID_TO = '" + MEDICAL_VALID_TO + "', @QUALIFICATION = '" + QUALIFICATION + "', @DEFAULT_MINUTE_PRICE = '" + DEFAULT_MINUTE_PRICE + "', @AIRCRAFT_CATEGORY = '" + AIRCRAFT_CATEGORY + "'", con)
    con.Open()
    Dim da As New Data.SqlClient.SqlDataAdapter(cmd)
    da.Fill(dt)

    'convert the filled DT into JSON
    Dim serializer As New System.Web.Script.Serialization.JavaScriptSerializer()
    Dim rows As New List(Of Dictionary(Of String, Object))()
    Dim row As Dictionary(Of String, Object)
    For Each dr As System.Data.DataRow In dt.Rows
        row = New Dictionary(Of String, Object)()
        For Each col As System.Data.DataColumn In dt.Columns
            row.Add(col.ColumnName, dr(col))
        Next
        rows.Add(row)
    Next
    Return serializer.Serialize(rows)
    End Using
    End Using
end function

<WebMethod()> _
<ScriptMethod(ResponseFormat := ResponseFormat.Json)> _
Public function LKMB_getMeteoActual(byval usr as string, byval token as string, byval stationId as string) as string
    Dim dt As New System.Data.DataTable()
    Using con As New Data.SqlClient.SqlConnection(ConfigurationManager.ConnectionStrings("lkmb").ConnectionString)
    Using cmd As New Data.SqlClient.SqlCommand("dbo.[LKMB_getMeteoActual] @USR = '" + usr + "', @TOKEN = '" + token + "', @STATION_ID = '" + stationId + "'", con)
    con.Open()
    Dim da As New Data.SqlClient.SqlDataAdapter(cmd)
    da.Fill(dt)

    'convert the filled DT into JSON
    Dim serializer As New System.Web.Script.Serialization.JavaScriptSerializer()
    Dim rows As New List(Of Dictionary(Of String, Object))()
    Dim row As Dictionary(Of String, Object)
    For Each dr As System.Data.DataRow In dt.Rows
        row = New Dictionary(Of String, Object)()
        For Each col As System.Data.DataColumn In dt.Columns
            row.Add(col.ColumnName, dr(col))
        Next
        rows.Add(row)
    Next
    Return serializer.Serialize(rows)
    End Using
    End Using
end function

<WebMethod()> _
<ScriptMethod(ResponseFormat := ResponseFormat.Json)> _
Public function LKMB_reservation_status(byval usr as string, byval token as string, byval ID as string, byval USER_EMAIL as string, byval [STATUS] as string) as string
    Dim dt As New System.Data.DataTable()
    Using con As New Data.SqlClient.SqlConnection(ConfigurationManager.ConnectionStrings("lkmb").ConnectionString)
    Using cmd As New Data.SqlClient.SqlCommand("dbo.[LKMB_reservation_status] @USR = '" + usr + "', @TOKEN = '" + token + "', @ID = " + ID + _
        " , @USER_EMAIL = '" + USER_EMAIL + "', @STATUS = " + [STATUS] + "", con)
    con.Open()
    Dim da As New Data.SqlClient.SqlDataAdapter(cmd)
    da.Fill(dt)

    'convert the filled DT into JSON
    Dim serializer As New System.Web.Script.Serialization.JavaScriptSerializer()
    Dim rows As New List(Of Dictionary(Of String, Object))()
    Dim row As Dictionary(Of String, Object)
    For Each dr As System.Data.DataRow In dt.Rows
        row = New Dictionary(Of String, Object)()
        For Each col As System.Data.DataColumn In dt.Columns
            row.Add(col.ColumnName, dr(col))
        Next
        rows.Add(row)
    Next
    Return serializer.Serialize(rows)
    End Using
    End Using
end function

<WebMethod()> _
<ScriptMethod(ResponseFormat := ResponseFormat.Json)> _
Public function LKMB_reservation(byval usr as string, byval token as string, byval ID as string, byval [D_FROM] as string, byval [D_TO] as string, byval IMATRIKULACE as string, byval USER_EMAIL as string, byval AIRFIELD as string _
    , byval NOTE as string, byval FLIGHT_TYPE as string, byval INSTRUKTOR as string, byval INSTRUKTOR_NAME as string, byval [STATUS] as string) as string
    Dim dt As New System.Data.DataTable()
    Using con As New Data.SqlClient.SqlConnection(ConfigurationManager.ConnectionStrings("lkmb").ConnectionString)
    Using cmd As New Data.SqlClient.SqlCommand("dbo.[LKMB_reservation] @USR = '" + usr + "', @TOKEN = '" + token + "', @ID = " + ID + _
        " , @D_FROM = '" + [D_FROM] + "', @D_TO = '" + [D_TO] + "', @IMATRIKULACE = '" + IMATRIKULACE + "', @USER_EMAIL = '" + USER_EMAIL + "', @AIRFIELD = '" + AIRFIELD + "', @NOTE = N'" + NOTE + "', @FLIGHT_TYPE = '" + FLIGHT_TYPE + "', @INSTRUKTOR = " + INSTRUKTOR + ", @INSTRUKTOR_NAME = '" + INSTRUKTOR_NAME + "', @STATUS = " + [STATUS], con)
    con.Open()
    Dim da As New Data.SqlClient.SqlDataAdapter(cmd)
    da.Fill(dt)

    'convert the filled DT into JSON
    Dim serializer As New System.Web.Script.Serialization.JavaScriptSerializer()
    Dim rows As New List(Of Dictionary(Of String, Object))()
    Dim row As Dictionary(Of String, Object)
    For Each dr As System.Data.DataRow In dt.Rows
        row = New Dictionary(Of String, Object)()
        For Each col As System.Data.DataColumn In dt.Columns
            row.Add(col.ColumnName, dr(col))
        Next
        rows.Add(row)
    Next
    Return serializer.Serialize(rows)
    End Using
    End Using
end function

<WebMethod()> _
<ScriptMethod(ResponseFormat := ResponseFormat.Json)> _
Public function LKMB_getReservations(byval usr as string, byval token as string, byval d_from as string) as string
    Dim dt As New System.Data.DataTable()
    Using con As New Data.SqlClient.SqlConnection(ConfigurationManager.ConnectionStrings("lkmb").ConnectionString)
    Using cmd As New Data.SqlClient.SqlCommand("dbo.LKMB_getReservations @USR = '" + usr + "', @TOKEN = '" + token + "', @D_FROM = '" + d_from + "'", con)
    con.Open()
    Dim da As New Data.SqlClient.SqlDataAdapter(cmd)
    da.Fill(dt)

    'convert the filled DT into JSON
    Dim serializer As New System.Web.Script.Serialization.JavaScriptSerializer()
    Dim rows As New List(Of Dictionary(Of String, Object))()
    Dim row As Dictionary(Of String, Object)
    For Each dr As System.Data.DataRow In dt.Rows
        row = New Dictionary(Of String, Object)()
        For Each col As System.Data.DataColumn In dt.Columns
            row.Add(col.ColumnName, dr(col))
        Next
        rows.Add(row)
    Next
    Return serializer.Serialize(rows)
    End Using
    End Using
end function

<WebMethod()> _
<ScriptMethod(ResponseFormat := ResponseFormat.Json)> _
Public function LKMB_flight_approve(byval usr as string, byval token as string, byval ID as string, byval USER_EMAIL as string, byval APPROVED as string) as string
    Dim dt As New System.Data.DataTable()
    Using con As New Data.SqlClient.SqlConnection(ConfigurationManager.ConnectionStrings("lkmb").ConnectionString)
    Using cmd As New Data.SqlClient.SqlCommand("dbo.[LKMB_flight_approve] @USR = '" + usr + "', @TOKEN = '" + token + "', @ID = " + ID + _
        " , @USER_EMAIL = '" + USER_EMAIL + "', @APPROVED = " + APPROVED + "", con)
    con.Open()
    Dim da As New Data.SqlClient.SqlDataAdapter(cmd)
    da.Fill(dt)

    'convert the filled DT into JSON
    Dim serializer As New System.Web.Script.Serialization.JavaScriptSerializer()
    Dim rows As New List(Of Dictionary(Of String, Object))()
    Dim row As Dictionary(Of String, Object)
    For Each dr As System.Data.DataRow In dt.Rows
        row = New Dictionary(Of String, Object)()
        For Each col As System.Data.DataColumn In dt.Columns
            row.Add(col.ColumnName, dr(col))
        Next
        rows.Add(row)
    Next
    Return serializer.Serialize(rows)
    End Using
    End Using
end function

<WebMethod()> _
<ScriptMethod(ResponseFormat := ResponseFormat.Json)> _
Public function LKMB_flight(byval usr as string, byval token as string, byval ID as string, byval [DATE] as string, byval IMATRIKULACE as string, byval USER_EMAIL as string, byval POSADKA as string, byval TAKE_OFF as string, byval LANDING as string _
    , byval FLIGHT_TIME_MINUTES as string, byval NUMBER_OF_STARTS as string, byval NOTE as string, byval FLIGHT_TYPE as string, byval COUNTER_BEGIN as string, byval COUNTER_END as string _
    , byval MINUTE_PRICE as string, byval PRICE as string, byval INSTRUKTOR as string) as string
    Dim dt As New System.Data.DataTable()
    Using con As New Data.SqlClient.SqlConnection(ConfigurationManager.ConnectionStrings("lkmb").ConnectionString)
    Using cmd As New Data.SqlClient.SqlCommand("dbo.[LKMB_flight] @USR = '" + usr + "', @TOKEN = '" + token + "', @ID = " + ID + _
        " , @DATE = '" + [DATE] + "', @IMATRIKULACE = '" + IMATRIKULACE + "', @USER_EMAIL = '" + USER_EMAIL + "', @POSADKA = '" + POSADKA + "', @TAKE_OFF = '" + TAKE_OFF + "', @LANDING = '" + LANDING + "', @FLIGHT_TIME_MINUTES = '" + FLIGHT_TIME_MINUTES + _
        "', @NUMBER_OF_STARTS = '" + NUMBER_OF_STARTS + "', @NOTE = N'" + NOTE + "', @FLIGHT_TYPE = '" + FLIGHT_TYPE + "', @COUNTER_BEGIN = " + COUNTER_BEGIN + ", @COUNTER_END = " + COUNTER_END + _
        " , @MINUTE_PRICE = " + MINUTE_PRICE + ", @PRICE = " + PRICE + ", @INSTRUKTOR = " + INSTRUKTOR + "", con)
    con.Open()
    Dim da As New Data.SqlClient.SqlDataAdapter(cmd)
    da.Fill(dt)

    'convert the filled DT into JSON
    Dim serializer As New System.Web.Script.Serialization.JavaScriptSerializer()
    Dim rows As New List(Of Dictionary(Of String, Object))()
    Dim row As Dictionary(Of String, Object)
    For Each dr As System.Data.DataRow In dt.Rows
        row = New Dictionary(Of String, Object)()
        For Each col As System.Data.DataColumn In dt.Columns
            row.Add(col.ColumnName, dr(col))
        Next
        rows.Add(row)
    Next
    Return serializer.Serialize(rows)
    End Using
    End Using
end function

<WebMethod()> _
<ScriptMethod(ResponseFormat := ResponseFormat.Json)> _
Public function LKMB_flight_Import(byval usr as string, byval token as string, byval FLIGHT_DATE as string, byval IMATRIKULACE as string, byval POSADKA as string, byval TAKE_OFF as string, byval LANDING as string _
    , byval FLIGHT_TIME_MINUTES as string, byval NUMBER_OF_STARTS as string, byval NOTE as string, byval FLIGHT_TYPE as string, byval COUNTER_BEGIN as string, byval COUNTER_END as string _
    , byval MINUTE_PRICE as string, byval PRICE as string, byval INSTRUKTOR as string) as string
    Dim dt As New System.Data.DataTable()
    Using con As New Data.SqlClient.SqlConnection(ConfigurationManager.ConnectionStrings("lkmb").ConnectionString)
    Using cmd As New Data.SqlClient.SqlCommand("dbo.[LKMB_flight2] @USR = '" + usr + "', @TOKEN = '" + token + "'" + _
        " , @DATE = '" + FLIGHT_DATE + "', @IMATRIKULACE = '" + IMATRIKULACE + "', @POSADKA = '" + POSADKA + "', @TAKE_OFF = '" + TAKE_OFF + "', @LANDING = '" + LANDING + "', @FLIGHT_TIME_MINUTES = '" + FLIGHT_TIME_MINUTES + _
        "', @NUMBER_OF_STARTS = '" + NUMBER_OF_STARTS + "', @INSTRUKTOR_X = '" + INSTRUKTOR + "', @NOTE = N'" + NOTE + "', @FLIGHT_TYPE = '" + FLIGHT_TYPE + "', @COUNTER_BEGIN = " + COUNTER_BEGIN + ", @COUNTER_END = " + COUNTER_END + _
        " , @MINUTE_PRICE = " + MINUTE_PRICE + ", @PRICE = " + PRICE + "", con)
    con.Open()
    Dim da As New Data.SqlClient.SqlDataAdapter(cmd)
    da.Fill(dt)

    'convert the filled DT into JSON
    Dim serializer As New System.Web.Script.Serialization.JavaScriptSerializer()
    Dim rows As New List(Of Dictionary(Of String, Object))()
    Dim row As Dictionary(Of String, Object)
    For Each dr As System.Data.DataRow In dt.Rows
        row = New Dictionary(Of String, Object)()
        For Each col As System.Data.DataColumn In dt.Columns
            row.Add(col.ColumnName, dr(col))
        Next
        rows.Add(row)
    Next
    Return serializer.Serialize(rows)
    End Using
    End Using
end function

<WebMethod()> _
<ScriptMethod(ResponseFormat := ResponseFormat.Json)> _
Public function LKMB_getFlights(byval usr as string, byval token as string, byval email as string, byval mm as string, byval yy as string) as string
    Dim dt As New System.Data.DataTable()
    Using con As New Data.SqlClient.SqlConnection(ConfigurationManager.ConnectionStrings("lkmb").ConnectionString)
    Using cmd As New Data.SqlClient.SqlCommand("dbo.LKMB_getFlights @USR = '" + usr + "', @TOKEN = '" + token + "', @EMAIL = '" + email + "', @m = " + mm + ", @y = " + yy, con)
    con.Open()
    Dim da As New Data.SqlClient.SqlDataAdapter(cmd)
    da.Fill(dt)

    'convert the filled DT into JSON
    Dim serializer As New System.Web.Script.Serialization.JavaScriptSerializer()
    Dim rows As New List(Of Dictionary(Of String, Object))()
    Dim row As Dictionary(Of String, Object)
    For Each dr As System.Data.DataRow In dt.Rows
        row = New Dictionary(Of String, Object)()
        For Each col As System.Data.DataColumn In dt.Columns
            row.Add(col.ColumnName, dr(col))
        Next
        rows.Add(row)
    Next
    Return serializer.Serialize(rows)
    End Using
    End Using
end function

<WebMethod()> _
<ScriptMethod(ResponseFormat := ResponseFormat.Json)> _
Public function LKMB_getAccountStatus(byval usr as string, byval token as string) as string
    Dim dt As New System.Data.DataTable()
    Using con As New Data.SqlClient.SqlConnection(ConfigurationManager.ConnectionStrings("lkmb").ConnectionString)
    Using cmd As New Data.SqlClient.SqlCommand("dbo.LKMB_getAccountStatus @USR = '" + usr + "', @TOKEN = '" + token + "'", con)
    con.Open()
    Dim da As New Data.SqlClient.SqlDataAdapter(cmd)
    da.Fill(dt)

    'convert the filled DT into JSON
    Dim serializer As New System.Web.Script.Serialization.JavaScriptSerializer()
    Dim rows As New List(Of Dictionary(Of String, Object))()
    Dim row As Dictionary(Of String, Object)
    For Each dr As System.Data.DataRow In dt.Rows
        row = New Dictionary(Of String, Object)()
        For Each col As System.Data.DataColumn In dt.Columns
            row.Add(col.ColumnName, dr(col))
        Next
        rows.Add(row)
    Next
    Return serializer.Serialize(rows)
    End Using
    End Using
end function

<WebMethod()> _
<ScriptMethod(ResponseFormat := ResponseFormat.Json)> _
Public function LKMB_getAircraft(byval usr as string, byval token as string) as string
    Dim dt As New System.Data.DataTable()
    Using con As New Data.SqlClient.SqlConnection(ConfigurationManager.ConnectionStrings("lkmb").ConnectionString)
    Using cmd As New Data.SqlClient.SqlCommand("dbo.LKMB_getAircraft @USR = '" + usr + "', @TOKEN = '" + token + "'", con)
    con.Open()
    Dim da As New Data.SqlClient.SqlDataAdapter(cmd)
    da.Fill(dt)

    'convert the filled DT into JSON
    Dim serializer As New System.Web.Script.Serialization.JavaScriptSerializer()
    Dim rows As New List(Of Dictionary(Of String, Object))()
    Dim row As Dictionary(Of String, Object)
    For Each dr As System.Data.DataRow In dt.Rows
        row = New Dictionary(Of String, Object)()
        For Each col As System.Data.DataColumn In dt.Columns
            row.Add(col.ColumnName, dr(col))
        Next
        rows.Add(row)
    Next
    Return serializer.Serialize(rows)
    End Using
    End Using
end function

<WebMethod()> _
<ScriptMethod(ResponseFormat := ResponseFormat.Json)> _
Public function LKMB_getWeeks(byval usr as string, byval token as string, byval yyyy as string) as string
    Dim dt As New System.Data.DataTable()
    Using con As New Data.SqlClient.SqlConnection(ConfigurationManager.ConnectionStrings("lkmb").ConnectionString)
    Using cmd As New Data.SqlClient.SqlCommand("dbo.getWeeks @YEAR = " + yyyy, con)
    con.Open()
    Dim da As New Data.SqlClient.SqlDataAdapter(cmd)
    da.Fill(dt)

    'convert the filled DT into JSON
    Dim serializer As New System.Web.Script.Serialization.JavaScriptSerializer()
    Dim rows As New List(Of Dictionary(Of String, Object))()
    Dim row As Dictionary(Of String, Object)
    For Each dr As System.Data.DataRow In dt.Rows
        row = New Dictionary(Of String, Object)()
        For Each col As System.Data.DataColumn In dt.Columns
            row.Add(col.ColumnName, dr(col))
        Next
        rows.Add(row)
    Next
    Return serializer.Serialize(rows)
    End Using
    End Using
end function

<WebMethod()> _
<ScriptMethod(ResponseFormat := ResponseFormat.Json)> _
Public function LKMB_updateAccountEmail(byval usr as string, byval token as string, byval eOld as string, byval eNew as string) as string
    Dim dt As New System.Data.DataTable()
    Using con As New Data.SqlClient.SqlConnection(ConfigurationManager.ConnectionStrings("lkmb").ConnectionString)
    Using cmd As New Data.SqlClient.SqlCommand("dbo.EmailChange @USR = '" + usr + "', @TOKEN = '" + token + "', @OLD_EMAIL = '" + eOld + "', @NEW_EMAIL = '" + eNew + "'", con)
    con.Open()
    Dim da As New Data.SqlClient.SqlDataAdapter(cmd)
    da.Fill(dt)

    'convert the filled DT into JSON
    Dim serializer As New System.Web.Script.Serialization.JavaScriptSerializer()
    Dim rows As New List(Of Dictionary(Of String, Object))()
    Dim row As Dictionary(Of String, Object)
    For Each dr As System.Data.DataRow In dt.Rows
        row = New Dictionary(Of String, Object)()
        For Each col As System.Data.DataColumn In dt.Columns
            row.Add(col.ColumnName, dr(col))
        Next
        rows.Add(row)
    Next
    Return serializer.Serialize(rows)
    End Using
    End Using
end function

<WebMethod()> _
<ScriptMethod(ResponseFormat := ResponseFormat.Json)> _
Public function LKMB_updateAccountActive(byval usr as string, byval token as string, byval e as string, byval act as string) as string
    Dim dt As New System.Data.DataTable()
    Using con As New Data.SqlClient.SqlConnection(ConfigurationManager.ConnectionStrings("lkmb").ConnectionString)
    Using cmd As New Data.SqlClient.SqlCommand("dbo.LKMB_updateAccountActive @USR = '" + usr + "', @TOKEN = '" + token + "', @EMAIL = '" + e + "', @ACTIVE = " + act, con)
    con.Open()
    Dim da As New Data.SqlClient.SqlDataAdapter(cmd)
    da.Fill(dt)

    'convert the filled DT into JSON
    Dim serializer As New System.Web.Script.Serialization.JavaScriptSerializer()
    Dim rows As New List(Of Dictionary(Of String, Object))()
    Dim row As Dictionary(Of String, Object)
    For Each dr As System.Data.DataRow In dt.Rows
        row = New Dictionary(Of String, Object)()
        For Each col As System.Data.DataColumn In dt.Columns
            row.Add(col.ColumnName, dr(col))
        Next
        rows.Add(row)
    Next
    Return serializer.Serialize(rows)
    End Using
    End Using
end function

<WebMethod()> _
<ScriptMethod(ResponseFormat := ResponseFormat.Json)> _
Public function LKMB_getFailures(byval usr as string, byval token as string) as string
    Dim dt As New System.Data.DataTable()
    Using con As New Data.SqlClient.SqlConnection(ConfigurationManager.ConnectionStrings("lkmb").ConnectionString)
    Using cmd As New Data.SqlClient.SqlCommand("dbo.LKMB_getFailures @USR = '" + usr + "', @TOKEN = '" + token + "'", con)
    con.Open()
    Dim da As New Data.SqlClient.SqlDataAdapter(cmd)
    da.Fill(dt)

    'convert the filled DT into JSON
    Dim serializer As New System.Web.Script.Serialization.JavaScriptSerializer()
    Dim rows As New List(Of Dictionary(Of String, Object))()
    Dim row As Dictionary(Of String, Object)
    For Each dr As System.Data.DataRow In dt.Rows
        row = New Dictionary(Of String, Object)()
        For Each col As System.Data.DataColumn In dt.Columns
            row.Add(col.ColumnName, dr(col))
        Next
        rows.Add(row)
    Next
    Return serializer.Serialize(rows)
    End Using
    End Using
end function

<WebMethod()> _
<ScriptMethod(ResponseFormat := ResponseFormat.Json)> _
Public function LKMB_failure_solve(byval usr as string, byval token as string, byval ID as string, byval USER_EMAIL as string, byval SOLVED as string) as string
    Dim dt As New System.Data.DataTable()
    Using con As New Data.SqlClient.SqlConnection(ConfigurationManager.ConnectionStrings("lkmb").ConnectionString)
    Using cmd As New Data.SqlClient.SqlCommand("dbo.[LKMB_failure_solve] @USR = '" + usr + "', @TOKEN = '" + token + "', @ID = " + ID + _
        " , @USER_EMAIL = '" + USER_EMAIL + "', @SOLVED = " + SOLVED + "", con)
    con.Open()
    Dim da As New Data.SqlClient.SqlDataAdapter(cmd)
    da.Fill(dt)

    'convert the filled DT into JSON
    Dim serializer As New System.Web.Script.Serialization.JavaScriptSerializer()
    Dim rows As New List(Of Dictionary(Of String, Object))()
    Dim row As Dictionary(Of String, Object)
    For Each dr As System.Data.DataRow In dt.Rows
        row = New Dictionary(Of String, Object)()
        For Each col As System.Data.DataColumn In dt.Columns
            row.Add(col.ColumnName, dr(col))
        Next
        rows.Add(row)
    Next
    Return serializer.Serialize(rows)
    End Using
    End Using
end function

<WebMethod()> _
<ScriptMethod(ResponseFormat := ResponseFormat.Json)> _
Public function LKMB_failure(byval usr as string, byval token as string, byval ID as string, byval [DATE] as string, byval PRICE as string, byval IMATRIKULACE as string _
    , byval NOTE as string, byval USER_EMAIL as string) as string
    Dim dt As New System.Data.DataTable()
    Using con As New Data.SqlClient.SqlConnection(ConfigurationManager.ConnectionStrings("lkmb").ConnectionString)
    Using cmd As New Data.SqlClient.SqlCommand("dbo.LKMB_failure @USR = '" + usr + "', @TOKEN = '" + token + "', @ID = " + ID + _
        ", @DATE = '" + [DATE] + "', @PRICE = '" + PRICE + "', @IMATRIKULACE = '" + IMATRIKULACE + "', @NOTE = '" + NOTE + _
        "', @USER_EMAIL = '" + USER_EMAIL + "'", con)
    con.Open()
    Dim da As New Data.SqlClient.SqlDataAdapter(cmd)
    da.Fill(dt)

    'convert the filled DT into JSON
    Dim serializer As New System.Web.Script.Serialization.JavaScriptSerializer()
    Dim rows As New List(Of Dictionary(Of String, Object))()
    Dim row As Dictionary(Of String, Object)
    For Each dr As System.Data.DataRow In dt.Rows
        row = New Dictionary(Of String, Object)()
        For Each col As System.Data.DataColumn In dt.Columns
            row.Add(col.ColumnName, dr(col))
        Next
        rows.Add(row)
    Next
    Return serializer.Serialize(rows)
    End Using
    End Using
end function

<WebMethod()> _
<ScriptMethod(ResponseFormat := ResponseFormat.Json)> _
Public function LKMB_getUsers(byval usr as string, byval token as string, byval ACTIVE_ONLY as string) as string
    Dim dt As New System.Data.DataTable()
    Using con As New Data.SqlClient.SqlConnection(ConfigurationManager.ConnectionStrings("lkmb").ConnectionString)
    Using cmd As New Data.SqlClient.SqlCommand("dbo.LKMB_getUsers @USR = '" + usr + "', @TOKEN = '" + token + "', @ACTIVE_ONLY = " + ACTIVE_ONLY, con)
    con.Open()
    Dim da As New Data.SqlClient.SqlDataAdapter(cmd)
    da.Fill(dt)

    'convert the filled DT into JSON
    Dim serializer As New System.Web.Script.Serialization.JavaScriptSerializer()
    Dim rows As New List(Of Dictionary(Of String, Object))()
    Dim row As Dictionary(Of String, Object)
    For Each dr As System.Data.DataRow In dt.Rows
        row = New Dictionary(Of String, Object)()
        For Each col As System.Data.DataColumn In dt.Columns
            row.Add(col.ColumnName, dr(col))
        Next
        rows.Add(row)
    Next
    Return serializer.Serialize(rows)
    End Using
    End Using
end function

<WebMethod()> _
<ScriptMethod(ResponseFormat := ResponseFormat.Json)> _
Public function LKMB_payment(byval usr as string, byval token as string, byval ID as string, byval [DATE] as string, byval AMOUNT as string, byval PAYMENT_TYPE as string _
    , byval DOCUMENT as string, byval USER_EMAIL as string) as string
    Dim dt As New System.Data.DataTable()
    Using con As New Data.SqlClient.SqlConnection(ConfigurationManager.ConnectionStrings("lkmb").ConnectionString)
    Using cmd As New Data.SqlClient.SqlCommand("dbo.LKMB_payment @USR = '" + usr + "', @TOKEN = '" + token + "', @ID = " + ID + _
        ", @DATE = '" + [DATE] + "', @AMOUNT = '" + AMOUNT + "', @PAYMENT_TYPE = '" + PAYMENT_TYPE + "', @DOCUMENT = '" + DOCUMENT + _
        "', @USER_EMAIL = '" + USER_EMAIL + "'", con)
    con.Open()
    Dim da As New Data.SqlClient.SqlDataAdapter(cmd)
    da.Fill(dt)

    'convert the filled DT into JSON
    Dim serializer As New System.Web.Script.Serialization.JavaScriptSerializer()
    Dim rows As New List(Of Dictionary(Of String, Object))()
    Dim row As Dictionary(Of String, Object)
    For Each dr As System.Data.DataRow In dt.Rows
        row = New Dictionary(Of String, Object)()
        For Each col As System.Data.DataColumn In dt.Columns
            row.Add(col.ColumnName, dr(col))
        Next
        rows.Add(row)
    Next
    Return serializer.Serialize(rows)
    End Using
    End Using
end function

<WebMethod()> _
<ScriptMethod(ResponseFormat := ResponseFormat.Json)> _
Public function getMonthsFilter(byval usr as string, byval token as string, byval email as string) as string
    Dim dt As New System.Data.DataTable()
    Using con As New Data.SqlClient.SqlConnection(ConfigurationManager.ConnectionStrings("lkmb").ConnectionString)
    Using cmd As New Data.SqlClient.SqlCommand("dbo.getMonthsFilter @USR = '" + usr + "', @TOKEN = '" + token + "', @EMAIL = '" + email + "'", con)
    con.Open()
    Dim da As New Data.SqlClient.SqlDataAdapter(cmd)
    da.Fill(dt)

    'convert the filled DT into JSON
    Dim serializer As New System.Web.Script.Serialization.JavaScriptSerializer()
    Dim rows As New List(Of Dictionary(Of String, Object))()
    Dim row As Dictionary(Of String, Object)
    For Each dr As System.Data.DataRow In dt.Rows
        row = New Dictionary(Of String, Object)()
        For Each col As System.Data.DataColumn In dt.Columns
            row.Add(col.ColumnName, dr(col))
        Next
        rows.Add(row)
    Next
    Return serializer.Serialize(rows)
    End Using
    End Using
end function

<WebMethod()> _
<ScriptMethod(ResponseFormat := ResponseFormat.Json)> _
Public function LKMB_getPayments(byval usr as string, byval token as string, byval email as string, byval mm as string, byval yy as string) as string
    Dim dt As New System.Data.DataTable()
    Using con As New Data.SqlClient.SqlConnection(ConfigurationManager.ConnectionStrings("lkmb").ConnectionString)
    Using cmd As New Data.SqlClient.SqlCommand("dbo.LKMB_getPayments @USR = '" + usr + "', @TOKEN = '" + token + "', @EMAIL = '" + email + "', @m = " + mm + ", @y = " + yy, con)
    con.Open()
    Dim da As New Data.SqlClient.SqlDataAdapter(cmd)
    da.Fill(dt)

    'convert the filled DT into JSON
    Dim serializer As New System.Web.Script.Serialization.JavaScriptSerializer()
    Dim rows As New List(Of Dictionary(Of String, Object))()
    Dim row As Dictionary(Of String, Object)
    For Each dr As System.Data.DataRow In dt.Rows
        row = New Dictionary(Of String, Object)()
        For Each col As System.Data.DataColumn In dt.Columns
            row.Add(col.ColumnName, dr(col))
        Next
        rows.Add(row)
    Next
    Return serializer.Serialize(rows)
    End Using
    End Using
end function

<WebMethod()> _
<ScriptMethod(ResponseFormat := ResponseFormat.Json)> _
Public function airframe_info_insert(byval usr as string, byval token as string, byval log_file_name as string _
        , byval log_version as string, byval log_content_version as string, byval product as string, byval aircraft_ident as string, byval unit_software_part_number as string _
        , byval software_version as string, byval unit as string, byval airframe_hours as string, byval engine_hours as string, byval src as string, byval RESET_FILE as string) as string
    Dim dt As New System.Data.DataTable()
    Using con As New Data.SqlClient.SqlConnection(ConfigurationManager.ConnectionStrings("lkmb").ConnectionString)
    Using cmd As New Data.SqlClient.SqlCommand("dbo.airframe_info_insert @USR = '" + usr + "', @TOKEN = '" + token + "', @log_file_name = '" + log_file_name + _
        "', @log_version = '" + log_version + "', @log_content_version = '" + log_content_version + "', @product = '" + product + "', @aircraft_ident = '" + aircraft_ident + _
        "', @unit_software_part_number = '" + unit_software_part_number + "', @software_version = '" + software_version + "', @unit = '" + unit + "', @airframe_hours = '" + airframe_hours + _
        "', @engine_hours = '" + engine_hours + "', @src = '" + src + "', @RESET_FILE = " + RESET_FILE + "", con)
    con.Open()
    Dim da As New Data.SqlClient.SqlDataAdapter(cmd)
    da.Fill(dt)

    'convert the filled DT into JSON
    Dim serializer As New System.Web.Script.Serialization.JavaScriptSerializer()
    Dim rows As New List(Of Dictionary(Of String, Object))()
    Dim row As Dictionary(Of String, Object)
    For Each dr As System.Data.DataRow In dt.Rows
        row = New Dictionary(Of String, Object)()
        For Each col As System.Data.DataColumn In dt.Columns
            row.Add(col.ColumnName, dr(col))
        Next
        rows.Add(row)
    Next
    Return serializer.Serialize(rows)
    End Using
    End Using
end function

<WebMethod()> _
<ScriptMethod(ResponseFormat := ResponseFormat.Json)> _
Public function LKMB_getLogList(byval usr as string, byval token as string, byval param as string) as string
    Dim dt As New System.Data.DataTable()
    Using con As New Data.SqlClient.SqlConnection(ConfigurationManager.ConnectionStrings("lkmb").ConnectionString)
    Using cmd As New Data.SqlClient.SqlCommand("dbo.LKMB_getLogList @USR = '" + usr + "', @TOKEN = '" + token + "', @PARAM = '" + param + "'", con)
    con.Open()
    Dim da As New Data.SqlClient.SqlDataAdapter(cmd)
    da.Fill(dt)

    'convert the filled DT into JSON
    Dim serializer As New System.Web.Script.Serialization.JavaScriptSerializer()
    Dim rows As New List(Of Dictionary(Of String, Object))()
    Dim row As Dictionary(Of String, Object)
    For Each dr As System.Data.DataRow In dt.Rows
        row = New Dictionary(Of String, Object)()
        For Each col As System.Data.DataColumn In dt.Columns
            row.Add(col.ColumnName, dr(col))
        Next
        rows.Add(row)
    Next
    Return serializer.Serialize(rows)
    End Using
    End Using
end function

Public Function ConvertDataTabletoString(cmdString as string) As String
    Dim dt As New System.Data.DataTable()
    Using con As New Data.SqlClient.SqlConnection(ConfigurationManager.ConnectionStrings("lkmb").ConnectionString)
    Using cmd As New Data.SqlClient.SqlCommand(cmdString, con)
    con.Open()
    Dim da As New Data.SqlClient.SqlDataAdapter(cmd)
    da.Fill(dt)

    'convert the filled DT into JSON
    Dim serializer As New System.Web.Script.Serialization.JavaScriptSerializer()
    Dim rows As New List(Of Dictionary(Of String, Object))()
    Dim row As Dictionary(Of String, Object)
    For Each dr As System.Data.DataRow In dt.Rows
        row = New Dictionary(Of String, Object)()
        For Each col As System.Data.DataColumn In dt.Columns
            row.Add(col.ColumnName, dr(col))
        Next
        rows.Add(row)
    Next
    Return serializer.Serialize(rows)
    End Using
    End Using
End Function
end class