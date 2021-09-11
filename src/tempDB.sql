SELECT id, "ownerId", "resolverId", subject, description, "createdAt", "closedAt", "statusId", "typeId", "priorityId"
FROM public."Ticket";

update "Ticket" set "typeId" = 3, "priorityId" = 2 where id = 64

select *
from "TicketZone"
select *
from "Ticket";
select *
from "Flare"
select *
from "FlareType"
select *
from "TicketType"
select *
from "Zone"
select *
From "FlareStatus"
select *
from "Comment"
select *
from "CommentType"
insert into "Flare"

insert into "TicketZone"
    ("customerId","ispId", "zoneId","statusId", latitude, longitude,"createdAt", info, "typeId")
values
    (1, 1, 7, 1, 32.88652, 13.1814, '2021-07-24', 'more flares', 3)

update "Ticket" set "priorityId" = 1, "typeId" = 2

-- Clear Up
update "Flare" set "ticketId" = null, "statusId" = 1;
delete from "TicketZone";
delete from "Ticket";