"""Isolated chatbot sessions and turns.

Revision ID: 0001_sessions
Revises:
"""
import sqlalchemy as sa
from alembic import op

revision = "0001_sessions"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "chat_conversations",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column("token_hash", sa.String(64), nullable=False),
        sa.Column("expires_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
    )
    op.create_index("ix_chat_conversations_token_hash", "chat_conversations",
                    ["token_hash"], unique=True)
    op.create_table(
        "chat_turns",
        sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column("conversation_id", sa.String(36), sa.ForeignKey(
            "chat_conversations.id", ondelete="CASCADE"), nullable=False),
        sa.Column("role", sa.String(16), nullable=False),
        sa.Column("content", sa.Text(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
    )
    op.create_index("ix_chat_turns_conversation_id", "chat_turns", ["conversation_id"])


def downgrade() -> None:
    op.drop_index("ix_chat_turns_conversation_id", table_name="chat_turns")
    op.drop_table("chat_turns")
    op.drop_index("ix_chat_conversations_token_hash", table_name="chat_conversations")
    op.drop_table("chat_conversations")
