import sqlite3
from typing import Dict, Tuple, List
from ..models.capsule import MoneyMachine, PriceItem
from ..config import DB_PATH

COUNTRY_CURRENCIES = {
    "Worldwide": ("USD", "$", 1.0),
    "United States": ("USD", "$", 1.0),
    "United Kingdom": ("GBP", "£", 0.79),
    "Canada": ("CAD", "C$", 1.39),
    "Australia": ("AUD", "A$", 1.54),
    "Japan": ("JPY", "¥", 152.0),
    "Germany": ("EUR", "€", 0.92),
    "France": ("EUR", "€", 0.92),
    "Italy": ("EUR", "€", 0.92),
    "Spain": ("EUR", "€", 0.92),
    "India": ("INR", "₹", 84.5),
    "Brazil": ("BRL", "R$", 5.75),
    "China": ("CNY", "¥", 7.25),
    "Mexico": ("MXN", "Mex$", 20.1),
    "South Africa": ("ZAR", "R", 18.2)
}

def get_money_machine(birth_year: int, country: str = "Worldwide") -> MoneyMachine:
    row_then = None
    row_now = None
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()

        current_year = 2026

        # Fetch birth year data
        cursor.execute("""
        SELECT cpi, gas_usd, bread_usd, movie_ticket_usd, gold_usd
        FROM economy WHERE year = ?;
        """, (birth_year,))
        row_then = cursor.fetchone()

        # Fetch current year data
        cursor.execute("""
        SELECT cpi, gas_usd, bread_usd, movie_ticket_usd, gold_usd
        FROM economy WHERE year = ?;
        """, (current_year,))
        row_now = cursor.fetchone()

        conn.close()
    except Exception as e:
        print(f"Economy DB query error: {e}")

    if not row_then:
        row_then = (100.0, 1.20, 0.50, 3.50, 350.0)
    if not row_now:
        row_now = (330.0, 3.65, 2.15, 11.50, 2800.0)

    cpi_then, gas_then, bread_then, movie_then, gold_then = row_then
    cpi_now, gas_now, bread_now, movie_now, gold_now = row_now

    # Cumulative inflation
    inflation_pct = round(((cpi_now - cpi_then) / cpi_then) * 100.0, 1)

    code, symbol, rate = COUNTRY_CURRENCIES.get(country, COUNTRY_CURRENCIES["Worldwide"])

    def fmt_price(usd: float) -> str:
        local_val = usd * rate
        if code == "JPY":
            return f"{symbol}{int(local_val):,}"
        return f"{symbol}{local_val:,.2f}"

    prices: List[PriceItem] = [
        PriceItem(item="Cinema Ticket", price_then=fmt_price(movie_then), price_now=fmt_price(movie_now), unit="1 ticket"),
        PriceItem(item="Gallon of Petrol", price_then=fmt_price(gas_then), price_now=fmt_price(gas_now), unit="1 gallon (3.8L)"),
        PriceItem(item="Loaf of Bread", price_then=fmt_price(bread_then), price_now=fmt_price(bread_now), unit="1 standard loaf"),
        PriceItem(item="Ounce of Gold", price_then=fmt_price(gold_then), price_now=fmt_price(gold_now), unit="1 troy oz (31.1g)")
    ]

    return MoneyMachine(
        base_year=birth_year,
        current_year=current_year,
        cumulative_inflation_pct=inflation_pct,
        currency_code=code,
        currency_symbol=symbol,
        usd_rate=rate,
        prices=prices
    )
