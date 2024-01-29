'''
    Module to serve the data from de database.
'''
from flask import Flask, render_template, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS

import logging

app = Flask(__name__)
cors = CORS(app)

app.config['MYSQL_HOST'] = 'mysql'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'admin'
app.config['MYSQL_DB'] = 'BBDD'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
app.logger.setLevel(logging.INFO)

mysql = MySQL(app)

''' Test endpoint. '''
@app.route("/")
def test():
    return "SERVER UP AND RUNNING"

''' Retrieve list of all EVSE. '''
@app.route("/api/EVSEs")
def EVSEs():
    try:
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT idEVSE, location, brand, model, visible FROM BBDD.EVSE WHERE visible is TRUE;")
        rows = cursor.fetchall()
        response = jsonify(rows)
        response.status_code = 200
        return response
    except Exception as e:
        print(e)
    finally:
        cursor.close()


''' Creates a category. '''
@app.route("/api/EVSEs/create", methods=['POST'])
def EVSE_create():
    try:
        _dict_data = request.json
        _location = _dict_data['location']
        _brand = _dict_data['brand']
        _model = _dict_data['model']
        # validate that the received values arent empty.
        if _location and _brand and _model and request.method == 'POST':
            sql_query = "INSERT INTO BBDD.EVSE (location, brand, model, visible) VALUES (%s, %s, %s, 1);"
            data = (_location, _brand, _model)
            cursor = mysql.connection.cursor()
            cursor.execute(sql_query, data)
            # sends the execution to the db.
            mysql.connection.commit()
            response = jsonify('EVSE successfully created!')
            response.status_code = 200
            return response
        else:
            return not_found()
    except Exception as e:
        app.logger.error(e)
    finally:
        cursor.close()

''' Updates an EVSE. '''
@app.route("/api/EVSEs/<int:id>/update", methods=['POST'])
def EVSE_update(id):
    try:
        _dict_data = request.json
        _location = _dict_data['location']
        _brand = _dict_data['brand']
        _model = _dict_data['model']
        if _location and _brand and _model and request.method == 'POST':
            sql_query = "UPDATE BBDD.EVSE SET location=%s, brand=%s, model=%s WHERE idEVSE=%s;"
            data = (_location, _brand, _model, id)
            cursor = mysql.connection.cursor()
            cursor.execute(sql_query, data)
            mysql.connection.commit()
            response = jsonify('EVSE updated successfully!')
            response.status_code = 200
            return response
        else:
            return not_found()
    except Exception as e:
        print(e)
    finally:
        cursor.close()

''' Deletes logically an EVSE. '''
@app.route("/api/EVSEs/<int:id>/delete", methods=['POST'])
def EVSE_delete(id):
    try:
        cursor = mysql.connection.cursor()
        cursor.execute("UPDATE BBDD.EVSE SET visible=FALSE WHERE idEVSE=%s;", (id,))
        mysql.connection.commit()
        response = jsonify('EVSE deleted!')
        response.status_code = 200
        return response
    except Exception as e:
        print(e)
    finally:
        cursor.close()

'''
    Exposes endpoint to get top five of bidirectional charging experiences.
'''
@app.route("/api/experiences-v2g")
def top_five_experiences_v2g():
    try:
        cursor = mysql.connection.cursor()
        sql_query = """SELECT\
                Transaction.idTransaction AS idTransaction,\
                Transaction.start_datetime AS start_datetime,\
                Transaction.duration_secs AS duration_secs,\
                Survey.experience_score AS experience_score,\
                Survey.comments AS comments\
            FROM\
                BBDD.Invoice\
             LEFT JOIN\
                BBDD.Survey ON Invoice.idInvoice = Survey.idInvoice\
             LEFT JOIN\
                BBDD.Transaction ON Invoice.idTransaction = Transaction.idTransaction\
            ORDER BY Survey.experience_score DESC\
            LIMIT 5;"""
        cursor.execute(sql_query)
        rows = cursor.fetchall()
        response = jsonify(rows)
        response.status_code = 200
        return response
    except Exception as e:
        print(e)
    finally:
        cursor.close()

'''
    Exposes endpoint to get best V2G transaction experiences given a date range.
'''
@app.route("/api/transaction-report-by-dates", methods=['POST'])
def transaction_report_by_dates():
    sql_query= """SELECT EVSE.model as EVSE_model,\
        FLOOR(AVG(Survey.experience_score)) AS avg_score,\
        MAX(Invoice.powerTransferedKW) AS max_power_transfered,\
        MIN(Invoice.powerTransferedKW) AS min_power_transfered,\
        COUNT(*) AS total_invoices\
    FROM BBDD.Invoice LEFT JOIN BBDD.Transaction ON Invoice.idTransaction=Transaction.idTransaction\
        LEFT JOIN BBDD.Survey ON Invoice.idInvoice = Survey.idInvoice\
        LEFT JOIN BBDD.belongs ON Invoice.idTransaction=belongs.idTransaction\
        LEFT JOIN BBDD.EVSE ON belongs.idEVSE=EVSE.idEVSE\
    WHERE Transaction.start_datetime>=%s\
        AND Transaction.start_datetime<=%s\
    GROUP BY EVSE.model\
    ORDER BY avg_score DESC;"""

    try:
        cursor = mysql.connection.cursor()
        _dict_data = request.json
        _date_from = _dict_data['date_from']
        _date_to = _dict_data['date_to']
        data = (_date_from, _date_to)
        if _date_from <= _date_to and _date_from and _date_to and request.method == 'POST':
            cursor.execute(sql_query, data)
            rows = cursor.fetchall()
            response = jsonify(rows)
            response.status_code = 200
            return response
    except Exception as e:
        print(e)
    finally:
        cursor.close()

'''
    Exposes endpoint to get best V2G transaction experiences given a date range and an EVSE.
'''
@app.route("/api/transaction-report-by-dates-and-evse", methods=['POST'])
def transaction_report_by_dates_and_evse():
    sql_query= """SELECT EVSE.model as EVSE_model,\
        FLOOR(AVG(Survey.experience_score)) AS avg_score,\
        MAX(Invoice.powerTransferedKW) AS max_power_transfered,\
        MIN(Invoice.powerTransferedKW) AS min_power_transfered,\
        COUNT(*) AS total_invoices\
    FROM BBDD.Invoice LEFT JOIN BBDD.Transaction ON Invoice.idTransaction=Transaction.idTransaction\
        LEFT JOIN BBDD.Survey ON Invoice.idInvoice = Survey.idInvoice\
        LEFT JOIN BBDD.belongs ON Invoice.idTransaction=belongs.idTransaction\
        LEFT JOIN BBDD.EVSE ON belongs.idEVSE=EVSE.idEVSE\
    WHERE Transaction.start_datetime>=%s\
        AND Transaction.start_datetime<=%s\
	AND EVSE.model=%s\
    GROUP BY EVSE.model\
    ORDER BY avg_score DESC;"""

    try:
        cursor = mysql.connection.cursor()
        _dict_data = request.json
        _date_from = _dict_data['date_from']
        _date_to = _dict_data['date_to']
        _EVSE = _dict_data['EVSE']
        if _date_from <= _date_to and _date_from and _date_to and _EVSE and request.method == 'POST':
            data = (_date_from, _date_to, _EVSE)
            cursor.execute(sql_query, data)
            rows = cursor.fetchall()
            response = jsonify(rows)
            response.status_code = 200
            return response
    except Exception as e:
        print(e)
    finally:
        cursor.close()


''' Not found error handler. '''
@app.errorhandler(404)
def not_found(error=None):
    message = {
        'status': 404,
        'message': 'Not Found: ' + request.url,
    }
    resp = jsonify(message)
    resp.status_code = 404
    return resp

''' Expose server to all net interfaces. '''
def serve():
    app.run(host='0.0.0.0', port=9000)

''' Entry point. '''
if __name__ == "__main__":
    app.run(debug=True, port=9000)
