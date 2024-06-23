from fastapi import APIRouter, Depends, status
from src.middlewares import db
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select, func
from fastapi.exceptions import HTTPException
from src.models import ElectricityApplication, ElectricityApplicationSchema
from datetime import date
eappl_router = APIRouter()


# TODO: Add API pagination
@eappl_router.get('/')
async def readAll(
    db_session: AsyncSession = Depends(db.session)
):
    count = await db_session.exec(select(func.count('*')).select_from(ElectricityApplication))
    results = await db_session.exec(select(ElectricityApplication))
    return {
        'hits': count.first(),
        'results': results.all(),
        'pageSize': 1200,
        'pageIndex': 1
    }


@eappl_router.get('/summary')
async def create(
    db_session: AsyncSession = Depends(db.session),
):
    stmt = select(
        ElectricityApplication.status,
        func.strftime(
            '%Y-%m', ElectricityApplication.dateSubmitted).label('date'),
        func.count('*').label('count')
    ).group_by(ElectricityApplication.status, 'date')

    resultset = await db_session.exec(stmt)
    return [dict(row._mapping) for row in resultset]


@eappl_router.get('/{id}')
async def read(
    id: int,
    db_session: AsyncSession = Depends(db.session)
):
    result = await db_session.get(ElectricityApplication, id)
    return result


@eappl_router.put('/{id}')
async def create(
    id: int,
    payload: ElectricityApplicationSchema,
    db_session: AsyncSession = Depends(db.session),
):
    record = await db_session.get(ElectricityApplication, id)
    if record:
        record.sqlmodel_update(payload.model_dump(exclude_unset=True))
        record.lastModified = date.today()
        db_session.add(record)
        await db_session.commit()
        await db_session.refresh(record)
        return record
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="record with the specified id doesn't exist"
        )
