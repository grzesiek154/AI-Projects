import openai
import os
from dotenv import find_dotenv, load_dotenv
import time
import logging
from datetime import datetime

load_dotenv()


news_api_key = os.environ.get("NEWS_SUMARIZER_KEY")

client = openai.OpenAI()
model = "gpt-3.5-turbo-16k"