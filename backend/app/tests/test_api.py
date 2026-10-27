from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health():
    res = client.get("/api/health")
    assert res.status_code == 200
    assert res.json()["status"] == "healthy"

def test_stats_endpoint():
    res = client.get("/api/stats?date=1995-06-15&country=United%20States")
    assert res.status_code == 200
    data = res.json()
    assert data["days_alive"] > 10000
    assert data["western_zodiac"]["sign"] == "Gemini"
    assert data["chinese_zodiac"]["animal"] == "Pig"
    assert data["country_selected"] == "United States"

def test_compare_endpoint():
    res = client.get("/api/compare?date1=1990-04-12&date2=1992-09-25&name1=Alex&name2=Jordan")
    assert res.status_code == 200
    data = res.json()
    assert data["older_person"] == "Alex"
    assert data["age_difference_days"] > 0
    assert "cosmic_distance_diff_km" in data

def test_date_validation():
    # Future date
    res = client.get("/api/stats?date=2099-01-01")
    assert res.status_code == 400
    
    # Pre-1900 date
    res2 = client.get("/api/stats?date=1850-01-01")
    assert res2.status_code == 400

    # Malformed date
    res3 = client.get("/api/stats?date=invalid-date")
    assert res3.status_code == 400
