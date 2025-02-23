--
-- PostgreSQL database dump
--

-- Dumped from database version 17.3
-- Dumped by pg_dump version 17.3

SET client_encoding = 'UTF8';

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: tasks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tasks (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    title character varying(200) NOT NULL,
    description text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tasks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tasks_id_seq OWNED BY public.tasks.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    name character varying(200) NOT NULL,
    email character varying(200) NOT NULL,
    password character varying(200) NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: tasks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks ALTER COLUMN id SET DEFAULT nextval('public.tasks_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tasks (id, user_id, title, description, created_at) FROM stdin;
2	21	cleaning	house	2025-02-22 13:30:50.77973
4	22	cleaning	house	2025-02-22 14:27:16.246162
5	21	office work	Create CL	2025-02-22 15:35:49.362668
6	21	Office work	ping manager	2025-02-22 15:39:52.140434
9	21	testtt	hyhyh	2025-02-22 16:25:04.752895
12	23	t2	implement	2025-02-22 16:37:33.94976
13	23	t3	demo	2025-02-22 16:38:07.850802
11	23	t1	thinking	2025-02-22 16:37:10.442175
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password) FROM stdin;
1	Test	test@gmail.com	password
4	ff	t2@gmail.com	$2b$10$Q.fiXmJ9Hlm4mjJaaFYISewAsA2wkyfkJMqFDXu88MCWpghiiWtfm
5	dd	dd@gmail.com	$2b$10$bOAfpzhZyjCODwXujs1XheB6qyo0BVTrARNu1pfVj5NAW/2.089pC
6	t3	t3@gmail.com	$2b$10$hIDOr36HIOMRG7JcSUP9NORkq9GbX8k.hOJw.oJpAL8tbY2uFpKjS
7	t4	t4@gmail.com	$2b$10$oxKCeMGzBZW0XrTOmN/NKeFE74uZOupk8PPTMB6d.XBewtkHQ7J1u
8	t4	t5@gmail.com	$2b$10$rMtfkusduqwWlNNUpcQhjuAIWeKsXKcVquanM1eztNLWvigNM7.o.
9	t6	t6@gmail.com	$2b$10$epxzMJQ3vst5VNVdV9RZdOE.NaKdhkN5rfV3hMOBKASaBXh78vwVe
10	t7	t7@gmail.com	$2b$10$/ODk7y0WtxjMRiHmtLNlv.xnRke/XD9nyyVKwZXm.Xiujdl/TllOe
11	t8	t8@gmail.com	$2b$10$cRpYbCfIiIvNU4SKU/b.G.7vzKvkjX7I5H1Sw2mCZJC8N5RFSlLT.
12	t9	t9@gmail.com	$2b$10$HEa23PciZNgem0DFxBcz9.u/0gDzzo1J/yR2ZbgwVNrXR.cy0444K
13	t11	t11@gmail.com	$2b$10$wZDHuQy2whqm/Q/m.tigXeu0ohY4GbJZxT0gEhXNEX.0l0xBsfmvi
14	t12	t12@gmail.com	$2b$10$IbpRbcOnK89ho8BE10nnVeAflmucCx3PrHmlFKP.Zw6P7pjiPchWy
15	t13	t13@gmail.com	$2b$10$O3kPLBXGYvjv0QuQEyYuMuExVjs7g1IUfEiomylTG17xESX/w4JB6
16	t14	t14@gmail.com	$2b$10$YfiXIDSbrv0WVw3FskNzruRVUhgAJyGxnl3BkZCb1nNfGvdxkWi5S
17	t15	t15@gmail.com	$2b$10$9eOc3efZXWURGRX131KE9.Jp7moUSnLBwTMf/iPdLhVwRrbMkaQRy
18	t16	t16@gmail.com	$2b$10$SNE9VKLnxBr6T0KTH0gc8ukUAIoIf/QsYcbqeXFlsUxVQuw5I685q
19	t17	t17@gmail.com	$2b$10$4YIj2JaMxeHzPwMYY5JApu2ym7VJ7K7vbce.FgLBvAlWFuLjAykqq
20	t18	t18@gmail.com	$2b$10$MrRIFSjBPF2k5bPFlCa0U.jj3XTYxUvCrZbyrkYuqSlKQMgQgIxt2
21	t22	t22@gmail.com	$2b$10$qqbiuh.PopaYnalmtg/6v.OrlZTor/0sYkCXOFwtklhF1DFb05YWi
22	t23	t23@gmail.com	$2b$10$sYI4RdT1KO3hO1aX5E8zF.eqVjDXDsXHDP9vlhcNVB2haqmwA4xqm
23	t27	t27@gmail.com	$2b$10$xorNo3S8snYTlVRJU29D9eUxeoUc5RTRlzlXKaJEuiVdnpsbA6Ufe
\.


--
-- Name: tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tasks_id_seq', 14, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 23, true);


--
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: tasks tasks_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

